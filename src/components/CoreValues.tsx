import { useState, useRef, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  Target,
  HeartHandshake,
  Award,
  Zap,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface ValueItem {
  id: string;
  num: string;
  icon: typeof ShieldCheck;
  title: string;
  copy: string;
}

const VALUES: ValueItem[] = [
  {
    id: "v-01",
    num: "01",
    icon: ShieldCheck,
    title: "INTEGRITY & RESPECT",
    copy: "Integrity and respect form the bedrock of how we coach our athletes, support our staff, and maintain uncompromised standards in every facility.",
  },
  {
    id: "v-02",
    num: "02",
    icon: Target,
    title: "COMMITMENT",
    copy: "Be relentlessly committed to encouraging, guiding, and empowering our members to conquer their most ambitious fitness and athletic goals.",
  },
  {
    id: "v-03",
    num: "03",
    icon: HeartHandshake,
    title: "COMPASSION",
    copy: "Be deeply compassionate to client needs, biomechanical constraints, and personal struggles throughout their body transformation journey.",
  },
  {
    id: "v-04",
    num: "04",
    icon: Award,
    title: "EXCELLENCE IN COACHING",
    copy: "Be the best coaches in the industry through certified hypertrophy mastery, continuous biomechanics audits, and relentless form precision.",
  },
  {
    id: "v-05",
    num: "05",
    icon: Zap,
    title: "EXCEED EXPECTATIONS",
    copy: "Consistently exceed expectations across equipment hygiene, personalized coach attention, and electrifying training community energy.",
  },
  {
    id: "v-06",
    num: "06",
    icon: Sparkles,
    title: "CONTINUOUS GROWTH",
    copy: "Constantly learn, adapt, and improve. Self-mastery is an endless mountain for both our certified coaches and our members.",
  },
];

export function CoreValues() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = VALUES.length;

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  // Automatic slideshow cadence (2000ms rest + 800ms transition)
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 2800);

    return () => clearTimeout(timer);
  }, [activeIdx, isPaused, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? 0;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative overflow-hidden bg-[#070707] py-20 sm:py-28 select-none border-t border-border/15">
      {/* ───────────── BACKGROUND MOUNTAIN CONTOUR & ELEVATION BLUEPRINT ───────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[50rem] rounded-full bg-volt/5 blur-[140px]" />

        {/* Mountain ridge silhouette graphic with glowing yellow nodes */}
        <svg
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          viewBox="0 0 1440 700"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Mountain Peak silhouette lines */}
          <path
            d="M -100 500 L 150 420 L 300 460 L 520 340 L 720 380 L 980 260 L 1150 310 L 1320 180 L 1550 240"
            stroke="#ffde47"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M -100 560 L 200 480 L 450 510 L 700 410 L 950 430 L 1250 280 L 1550 320"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />

          {/* Glowing Peak Nodes */}
          <circle cx="150" cy="420" r="3.5" fill="#ffde47" />
          <circle cx="980" cy="260" r="3.5" fill="#ffde47" />
          <circle cx="1320" cy="180" r="5" fill="#ffde47" className="animate-pulse" />
        </svg>

        {/* Floating Elevation Markers */}
        <div className="absolute left-[8%] top-[45%] text-[0.62rem] font-mono tracking-widest text-muted-foreground/60 hidden md:block">
          PEAK 1,200M
        </div>
        <div className="absolute left-[70%] top-[34%] text-[0.62rem] font-mono tracking-widest text-muted-foreground/60 hidden md:block">
          PEAK 2,300M
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        {/* ───────────── SECTION HEADER (Clean Title Only) ───────────── */}
        <div className="pb-4">
          <p className="text-[0.68rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.26em] text-volt font-display">
            WHAT WE BELIEVE IN
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            CORE <span className="text-volt">VALUES</span>
          </h2>
        </div>

        {/* ───────────── WIDESPREAD PERSPECTIVE MOUNTAIN DECK ───────────── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-8 sm:mt-12 flex h-[480px] sm:h-[540px] items-center justify-center overflow-visible"
        >
          {/* Render all 6 values in continuous 3D perspective fan */}
          {VALUES.map((item, idx) => {
            const Icon = item.icon;

            // Calculate relative circular offset from activeIdx (-3, -2, -1, 0, 1, 2, 3)
            let offset = (idx - activeIdx) % total;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;

            // Layering & transforms
            let transformStyle = "";
            let zIndex = 10;
            let opacity = 0;

            if (isActive) {
              // Active Front Center Card
              transformStyle = "translate3d(0, 0, 0) scale(1)";
              zIndex = 40;
              opacity = 1;
            } else if (offset === -1) {
              // Left Card 1
              transformStyle = "translate3d(-150px, 12px, 0) scale(0.92)";
              zIndex = 30;
              opacity = 0.85;
            } else if (offset === 1) {
              // Right Card 1
              transformStyle = "translate3d(150px, 12px, 0) scale(0.92)";
              zIndex = 30;
              opacity = 0.85;
            } else if (offset === -2) {
              // Left Card 2
              transformStyle = "translate3d(-290px, 24px, 0) scale(0.84)";
              zIndex = 20;
              opacity = 0.6;
            } else if (offset === 2) {
              // Right Card 2
              transformStyle = "translate3d(290px, 24px, 0) scale(0.84)";
              zIndex = 20;
              opacity = 0.6;
            } else if (offset === -3) {
              // Left Card 3
              transformStyle = "translate3d(-410px, 36px, 0) scale(0.76)";
              zIndex = 10;
              opacity = 0.35;
            } else if (offset === 3) {
              // Right Card 3
              transformStyle = "translate3d(410px, 36px, 0) scale(0.76)";
              zIndex = 10;
              opacity = 0.35;
            }

            return (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity,
                }}
                className={`absolute w-[86vw] max-w-[440px] sm:max-w-[460px] h-[380px] sm:h-[430px] rounded-[2rem] sm:rounded-[2.4rem] p-7 sm:p-9 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "bg-[#141414]/92 backdrop-blur-2xl border-2 border-volt/80 shadow-[0_20px_60px_-10px_rgba(255,222,71,0.25),0_0_0_1px_rgba(255,222,71,0.4)_inset]"
                    : "bg-[#111111]/85 backdrop-blur-xl border border-volt/35 hover:border-volt/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Diagonal Glass Sheen Reflection */}
                <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rotate-45 bg-linear-to-b from-white/12 via-white/5 to-transparent blur-md" />

                {/* Ambient Top Glow */}
                <div
                  className={`pointer-events-none absolute -top-16 -left-16 h-36 w-36 rounded-full bg-volt/15 blur-2xl transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* ──── TOP BAR: Large Numeral + Circular Icon ──── */}
                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-display text-5xl sm:text-6xl font-black leading-none tracking-tight transition-colors duration-500 ${
                      isActive ? "text-volt" : "text-volt/60"
                    }`}
                  >
                    {item.num}
                  </span>

                  <div
                    className={`grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#1a1a1a] border-2 border-volt text-volt shadow-[0_0_18px_rgba(255,222,71,0.4)]"
                        : "bg-[#161616] border border-volt/40 text-volt/70"
                    }`}
                  >
                    <Icon className="h-6 w-6 sm:h-6.5 sm:w-6.5" />
                  </div>
                </div>

                {/* ──── CARD BODY: Category + Title + Copy ──── */}
                <div className="relative mt-auto">
                  <p
                    className={`text-[0.68rem] font-bold uppercase tracking-[0.24em] font-display transition-opacity duration-500 ${
                      isActive ? "text-volt opacity-100" : "opacity-0"
                    }`}
                  >
                    CORE VALUE
                  </p>

                  <h3
                    className={`mt-2 font-display text-3xl sm:text-4xl font-black uppercase leading-[0.9] tracking-tight transition-all duration-500 ${
                      isActive ? "text-white opacity-100" : "text-white/20 opacity-30"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {item.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ───────────── BOTTOM CONTROLS & STEP TRACKER ───────────── */}
        <div className="mt-6 flex items-center justify-between max-w-2xl mx-auto px-4">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous core value"
            className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-full bg-[#141414] border border-border/60 text-white transition-all duration-300 hover:border-volt/60 hover:text-volt hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center gap-2 py-2">

            {/* Glowing Step Line with Node Points */}
            <div className="relative w-48 sm:w-64 h-1 bg-neutral-800 rounded-full overflow-hidden flex items-center">
              <div
                className="h-full bg-volt transition-all duration-500 rounded-full shadow-[0_0_8px_var(--volt)]"
                style={{
                  width: `${((activeIdx + 1) / total) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next core value"
            className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-full bg-[#141414] border border-border/60 text-volt transition-all duration-300 hover:border-volt hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
