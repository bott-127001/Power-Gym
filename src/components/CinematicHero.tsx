import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PowerButton } from "./PowerButton";
import { Atmosphere } from "./Atmosphere";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => `/hero-frames/frame_${String(index).padStart(4, "0")}.jpg`;

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state1Ref = useRef<HTMLDivElement>(null);
  const state2Ref = useRef<HTMLDivElement>(null);
  const state3Ref = useRef<HTMLDivElement>(null);
  const state3LineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const logoBannerRef = useRef<HTMLDivElement>(null);
  const emergeLayerRef = useRef<HTMLDivElement>(null);

  // Cached frame images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);

  const [, setLoadedCount] = useState(0);
  const [, setInitialFrameReady] = useState(false);

  // Draw image on canvas maintaining object-fit: cover with retina sharpness and responsive aspect ratio
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // Check if canvas resolution needs updating
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Calculate object-fit: cover bounds
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;
    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasAspect > imgAspect) {
      drawW = width;
      drawH = width / imgAspect;
      drawX = 0;
      drawY = (height - drawH) / 2;
    } else {
      drawH = height;
      drawW = height * imgAspect;
      drawX = (width - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // Progressive frame loading optimized for desktop and mobile
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);
    let isMounted = true;
    let loaded = 0;

    // 1. Load frame 1 immediately for instant render
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      setInitialFrameReady(true);
      renderFrame(1);
    };

    // 2. Load priority initial batch (frames 2 to 30)
    for (let i = 2; i <= Math.min(30, TOTAL_FRAMES); i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i - 1] = img;
        loaded++;
        setLoadedCount(loaded);
        if (currentFrameRef.current === i) {
          renderFrame(i);
        }
      };
    }

    // 3. Load remaining frames sequentially to preserve mobile bandwidth and memory
    const loadRemaining = () => {
      for (let i = 31; i <= TOTAL_FRAMES; i++) {
        if (!isMounted) return;
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (!isMounted) return;
          imagesRef.current[i - 1] = img;
          loaded++;
          setLoadedCount(loaded);
          if (currentFrameRef.current === i) {
            renderFrame(i);
          }
        };
      }
    };

    const timer = setTimeout(loadRemaining, 200);

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [renderFrame]);

  // Unified GSAP ScrollTrigger Pinned Canvas Animation Timeline (Desktop + Tablet + Mobile)
  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const state1 = state1Ref.current;
    const state2 = state2Ref.current;
    const state3 = state3Ref.current;
    const state3Line = state3LineRef.current;
    const hudTop = hudTopRef.current;
    const hudBottom = hudBottomRef.current;
    const badge = badgeRef.current;
    const overlay = overlayRef.current;
    const blurOverlay = blurOverlayRef.current;
    const progressLine = progressLineRef.current;
    const logoBanner = logoBannerRef.current;
    const emergeLayer = emergeLayerRef.current;

    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const frameSequence = { frame: 1 };

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () =>
            `+=${window.innerWidth < 768 ? Math.max(window.innerHeight * 3.6, 3200) : 3800}`,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Synchronize progress line indicator with video transformation
            const videoProgress = Math.min(1, p / 0.76);
            if (progressLine) {
              progressLine.style.transform = `scaleX(${videoProgress})`;
            }
          },
        },
      });

      // Frame scrub tween: scrubs through every single frame from 1 to 240 on all viewports
      scrollTl.to(
        frameSequence,
        {
          frame: TOTAL_FRAMES,
          snap: "frame",
          duration: 0.76,
          ease: "none",
          onUpdate: () => {
            const targetIndex = Math.max(
              1,
              Math.min(TOTAL_FRAMES, Math.round(frameSequence.frame)),
            );
            if (targetIndex !== currentFrameRef.current) {
              currentFrameRef.current = targetIndex;
              renderFrame(targetIndex);
            }
          },
        },
        0,
      );

      // ───────────── MASTER THREE-STATE CONTINUOUS TYPOGRAPHY SEQUENCE ─────────────
      // STATE 1 (POWERUP FITNESS): Visible at start (0.00 -> 0.18), cross-fades out at 0.18 -> 0.26
      scrollTl
        .fromTo(
          state1,
          { opacity: 1, yPercent: 0 },
          { opacity: 0, yPercent: -15, duration: 0.08, ease: "power1.inOut" },
          0.18,
        )
        .fromTo(
          [hudTop, hudBottom],
          { opacity: 1, y: 0 },
          { opacity: 0, y: -15, duration: 0.08, ease: "power1.inOut" },
          0.16,
        )
        .fromTo(
          badge,
          { opacity: 1, y: 0 },
          { opacity: 0, y: 20, duration: 0.08, ease: "power1.inOut" },
          0.18,
        );

      // STATE 2 (BUILT DIFFERENT.): Enters at 0.22 -> 0.30 (immediate cross-fade, NO GAP!), holds until 0.46, cross-fades out at 0.46 -> 0.54
      scrollTl
        .fromTo(
          state2,
          { opacity: 0, yPercent: 15 },
          { opacity: 1, yPercent: 0, duration: 0.08, ease: "power1.inOut" },
          0.22,
        )
        .to(state2, { opacity: 0, yPercent: -15, duration: 0.08, ease: "power1.inOut" }, 0.46);

      // STATE 3 (EVERY REP. EVERY DAY. A BETTER YOU.): Enters at 0.50 -> 0.58 (immediate cross-fade, NO GAP!), holds until 0.70, cross-fades out at 0.70 -> 0.76
      scrollTl
        .fromTo(
          state3,
          { opacity: 0, yPercent: 15 },
          { opacity: 1, yPercent: 0, duration: 0.08, ease: "power1.inOut" },
          0.5,
        )
        .fromTo(state3Line, { scaleX: 0 }, { scaleX: 1, duration: 0.08, ease: "power1.out" }, 0.52)
        .to(state3, { opacity: 0, yPercent: -15, duration: 0.06, ease: "power1.inOut" }, 0.7)
        .to(state3Line, { scaleX: 0, duration: 0.06, ease: "power1.inOut" }, 0.7);

      // STATE 4 (Final gym frame 240 with background depth blur & sharp PowerUp Logo): 0.74 -> 0.85
      scrollTl
        .fromTo(
          blurOverlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.1, ease: "power1.out" },
          0.74,
        )
        .fromTo(
          logoBanner,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: "power1.out" },
          0.74,
        );

      // PHASE 3 (Lower section emergence layer): 0.85 -> 1.00
      scrollTl.fromTo(
        emergeLayer,
        { yPercent: 100, opacity: 1 },
        { yPercent: 0, opacity: 1, duration: 0.15, ease: "power2.inOut" },
        0.85,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full bg-carbon-deep">
      {/* Pinned 100dvh Viewport Stage */}
      <div
        ref={stageRef}
        className="relative h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Atmosphere base */}
        <Atmosphere variant="a" />

        {/* ───────────── HTML5 FULL-SCREEN CANVAS ───────────── */}
        <div
          className="absolute inset-0 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-frames/frame_0001.jpg')" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block object-cover" />

          {/* Cinematic lighting & gradient overlay */}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          >
            {/* Top vignette for clean navigation readability */}
            <div className="absolute inset-x-0 top-0 h-36 sm:h-44 bg-linear-to-b from-carbon-deep/90 via-carbon-deep/45 to-transparent" />

            {/* Bottom rich vignette */}
            <div className="absolute inset-x-0 bottom-0 h-64 sm:h-[30rem] bg-linear-to-t from-carbon-deep via-carbon/70 to-transparent" />

            {/* Subtle radial cinematic vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(15,10,8,0.65)_100%)]" />

            {/* Filmic noise */}
            <div className="absolute inset-0 noise opacity-20" />
          </div>

          {/* Cinematic Soft Background Depth-of-Field Blur for Final Logo Reveal */}
          <div
            ref={blurOverlayRef}
            className="pointer-events-none absolute inset-0 backdrop-blur-md bg-carbon-deep/45 opacity-0 transition-opacity duration-300"
          />
        </div>

        {/* ───────────── FOREGROUND THREE-ZONE COMPOSITION CONTAINER ───────────── */}
        <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-3 sm:pb-6 pointer-events-none [padding-top:max(4.25rem,calc(env(safe-area-inset-top)+3.5rem))] [padding-bottom:max(0.5rem,env(safe-area-inset-bottom))]">
          {/* ──── ZONE 1: TOP HUD / NAV ANCHOR ──── */}
          <div ref={hudTopRef} className="shrink-0 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-volt pointer-events-auto">
              Showup. Grind. Repeat.
            </div>
          </div>

          {/* ──── ZONE 2: HERO STORY / TYPOGRAPHY CONTAINER (HERO TEXT LAYER) ──── */}
          <div className="flex-1 min-h-0 relative my-auto w-full max-w-3xl lg:max-w-4xl py-2 sm:py-4 flex flex-col justify-center">
            {/* STATE 1: ORIGINAL OPENING SCREEN (POWERUP FITNESS) */}
            <div ref={state1Ref} className="w-full">
              <h1 className="font-display font-black text-[clamp(2.3rem,6.8vw,8.5rem)] leading-[0.84] sm:leading-[0.82] tracking-tight uppercase select-none">
                POWER
                <span className="text-volt-gradient">
                  UP
                </span>{" "}
                <span className="text-foreground/95 inline-block">FITNESS</span>
              </h1>

              <p className="mt-2.5 sm:mt-4 md:mt-6 max-w-md sm:max-w-lg md:max-w-xl text-xs sm:text-base md:text-xl font-normal italic uppercase tracking-wider leading-relaxed text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                GET FITTER, STRONGER AND HEALTHIER
              </p>
            </div>

            {/* STATE 2: TRANSFORMED GYM SCENE (BUILT DIFFERENT.) */}
            <div
              ref={state2Ref}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0"
            >
              <h2 className="font-display font-black text-[clamp(2.3rem,6.8vw,8rem)] leading-[0.86] tracking-tight uppercase select-none text-foreground drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                BUILT DIFFERENT
              </h2>

              <p className="mt-2 sm:mt-3.5 max-w-md sm:max-w-lg md:max-w-xl text-xs sm:text-base md:text-xl font-normal tracking-wide text-foreground/85 leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Train harder. Move stronger. Become more.
              </p>
            </div>

            {/* STATE 3: FINAL EMOTIONAL STATEMENT (EVERY REP. EVERY DAY. A BETTER YOU.) */}
            <div
              ref={state3Ref}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0"
            >
              <div className="space-y-0.5 sm:space-y-1.5">
                <p className="font-display font-black text-[clamp(1.75rem,5vw,5.5rem)] leading-[0.88] tracking-tight uppercase text-foreground drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                  EVERY REP.
                </p>
                <p className="font-display font-black text-[clamp(1.75rem,5vw,5.5rem)] leading-[0.88] tracking-tight uppercase text-foreground drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                  EVERY DAY.
                </p>
                {/* Architectural Volt Yellow Accent Line */}
                <div className="py-1 sm:py-2">
                  <div
                    ref={state3LineRef}
                    className="h-1 sm:h-1.5 w-16 sm:w-32 md:w-40 bg-volt origin-left rounded-full shadow-sm"
                  />
                </div>
                <p className="font-display font-black text-[clamp(1.75rem,5vw,5.5rem)] leading-[0.88] tracking-tight uppercase text-foreground drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                  A BETTER <span className="text-volt">YOU</span>
                </p>
              </div>
            </div>
          </div>

          {/* ──── ZONE 3: DEDICATED CTA / ACTION INTERACTION ZONE ──── */}
          <div
            ref={ctaRef}
            className="shrink-0 w-full pt-2 pb-2 sm:py-4 flex flex-row flex-wrap items-center gap-2.5 sm:gap-4 pointer-events-auto max-w-md"
          >
            <PowerButton
              to="/branches"
              variant="volt"
              className="px-4 py-2.5 sm:px-7 sm:py-3.5 text-[0.65rem] sm:text-xs md:text-sm tracking-[0.16em] sm:tracking-[0.2em]"
            >
              Choose Branch
            </PowerButton>
            <PowerButton
              to="/franchise"
              variant="ghost"
              className="px-4 py-2.5 sm:px-7 sm:py-3.5 text-[0.65rem] sm:text-xs md:text-sm tracking-[0.16em] sm:tracking-[0.2em]"
            >
              Franchise
            </PowerButton>
          </div>

          {/* ──── ZONE 4: BOTTOM HUD / FLOATING STATUS & SCROLL PROGRESS BAR ──── */}
          <div
            ref={hudBottomRef}
            className="shrink-0 flex items-end justify-between gap-3 sm:gap-4 pt-2 sm:pt-4 border-t border-border/20 text-xs"
          >
            {/* Interactive Scroll scrubber track indicator */}
            <div className="flex flex-col gap-1 sm:gap-1.5 max-w-xs">
              <div className="flex items-center gap-2 text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground">
                <span className="relative flex h-4 w-2.5 sm:h-5 sm:w-3 items-start justify-center rounded-full border border-muted-foreground/40 p-0.5">
                  <span className="h-1 w-1 rounded-full bg-volt animate-bounce" />
                </span>
                <span className="hidden xs:inline">Scroll to surf transformation</span>
                <span className="xs:hidden">Scroll to surf</span>
              </div>
              {/* Progress track bar */}
              <div className="h-1 w-24 sm:w-44 rounded-full bg-white/10 overflow-hidden">
                <div
                  ref={progressLineRef}
                  className="h-full w-full bg-volt origin-left transition-transform duration-75"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>

            {/* Quick Live Stats Badge */}
            <div
              ref={badgeRef}
              className="pointer-events-auto flex items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl glass px-2 py-1 sm:px-4 sm:py-2 text-left mr-12 xs:mr-14 sm:mr-16 md:mr-20"
            >
              <div>
                <p className="font-display text-base xs:text-lg sm:text-2xl leading-none text-volt">5,000+</p>
                <p className="text-[0.45rem] xs:text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-muted-foreground mt-0.5 sm:mt-1">
                  Members
                </p>
              </div>
              <div className="h-4 sm:h-7 w-px bg-border/40" />
              <div>
                <p className="font-display text-base xs:text-lg sm:text-2xl leading-none text-foreground">
                  18/7
                </p>
                <p className="text-[0.45rem] xs:text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-muted-foreground mt-0.5 sm:mt-1">
                  Access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────── FINAL FRAME POWERUP LOGO EMBLEM ───────────── */}
        <div
          ref={logoBannerRef}
          className="pointer-events-none absolute inset-0 z-25 flex flex-col items-center justify-center text-center px-4 sm:px-6 opacity-0"
        >
          <div className="glass-strong rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 border border-volt/50 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.95)] w-[min(580px,calc(100vw-32px))] max-w-xl bg-carbon-deep/85 backdrop-blur-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full glass px-3 py-1 sm:px-4 sm:py-1 text-[0.55rem] sm:text-[0.65rem] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-volt">
              <Sparkles
                className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-volt animate-spin"
                style={{ animationDuration: "6s" }}
              />
              Transformation Complete
            </div>
            <h2 className="mt-3 sm:mt-4 font-display font-black text-[clamp(2.2rem,6.5vw,4.5rem)] leading-none uppercase tracking-wide">
              POWER<span className="text-volt-gradient">UP</span> FITNESS
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              Pune&apos;s premier biomechanics and transformation clubs in Bhukum & Mahalunge.
            </p>
          </div>
        </div>

        {/* ───────────── LOWER SECTION TAKEOVER LAYER (RISES UP OVER CANVAS) ───────────── */}
        <div
          ref={emergeLayerRef}
          className="absolute inset-0 z-30 pointer-events-auto flex flex-col justify-between bg-carbon border-t border-volt/30 shadow-[0_-40px_100px_rgba(0,0,0,0.98)] translate-y-full"
        >
          {/* Top Marquee Bar */}
          <div className="relative overflow-hidden border-b border-border/30 bg-carbon-deep/95 py-2.5 sm:py-4 backdrop-blur-md">
            <div className="flex w-max animate-marquee gap-8 sm:gap-12 whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, r) => (
                <div key={r} className="flex gap-8 sm:gap-12">
                  {[
                    "Transformation",
                    "Strength",
                    "Discipline",
                    "Confidence",
                    "Performance",
                    "Community",
                    "Elite Biomechanics",
                  ].map((w) => (
                    <span
                      key={w}
                      className="font-display text-lg sm:text-3xl uppercase tracking-wider text-muted-foreground/60"
                    >
                      {w} <span className="text-volt">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Section Introduction Card */}
          <div className="relative my-auto mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-12 w-full">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1fr_1fr] items-center">
              <div>
                <span className="text-[0.55rem] sm:text-[0.65rem] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.34em] text-volt">
                  The Power Up Standard
                </span>
                <h2 className="mt-2.5 sm:mt-4 font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.88] uppercase">
                  BUILT FOR <br />
                  <span className="text-volt">EXCELLENCE</span>
                </h2>
                <p className="mt-3 sm:mt-6 text-xs sm:text-base leading-relaxed text-muted-foreground max-w-md">
                  We engineered every square foot with elite biomechanics machines, private coaching
                  zones, and world-class athletic recovery.
                </p>
                <div className="mt-5 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-4">
                  <PowerButton
                    to="/about"
                    variant="volt"
                    className="px-4 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-sm"
                  >
                    Our Story
                  </PowerButton>
                  <PowerButton
                    to="/branches"
                    variant="ghost"
                    className="px-4 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-sm"
                  >
                    View Branches
                  </PowerButton>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="metal p-3 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
                  <p className="font-display text-2xl xs:text-3xl sm:text-5xl text-volt leading-none">5,000+</p>
                  <p className="mt-1 sm:mt-3 text-[0.45rem] xs:text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-muted-foreground">
                    Active Members
                  </p>
                </div>
                <div className="metal p-3 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
                  <p className="font-display text-2xl xs:text-3xl sm:text-5xl text-foreground leading-none">
                    18/7
                  </p>
                  <p className="mt-1 sm:mt-3 text-[0.45rem] xs:text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-muted-foreground">
                    Club Hours
                  </p>
                </div>
                <div className="metal p-3 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
                  <p className="font-display text-2xl xs:text-3xl sm:text-5xl text-volt leading-none">3</p>
                  <p className="mt-1 sm:mt-3 text-[0.45rem] xs:text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-muted-foreground">
                    Premium Branches
                  </p>
                </div>
                <div className="metal p-3 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
                  <p className="font-display text-2xl xs:text-3xl sm:text-5xl text-foreground leading-none">
                    12+
                  </p>
                  <p className="mt-1 sm:mt-3 text-[0.45rem] xs:text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-muted-foreground">
                    Elite Coaches
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom subtle scroll cue */}
          <div className="py-2.5 sm:py-4 text-center border-t border-border/20">
            <span className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
              Continue scrolling for facilities & programs ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
