import { Reveal } from "./Reveal";
import { Atmosphere } from "./Atmosphere";
import {
  MessageSquare,
  Scale,
  FileSignature,
  Wrench,
  Rocket,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface PathStep {
  n: string;
  title: string;
  category: string;
  icon: typeof MessageSquare;
  copy: string;
  side: "left" | "right" | "center";
}

const STEPS: PathStep[] = [
  {
    n: "01",
    title: "Connect",
    category: "Initial Discovery",
    icon: MessageSquare,
    copy: "Share your goals, preferred territory location, and investment budget with our expansion team.",
    side: "left",
  },
  {
    n: "02",
    title: "Evaluate",
    category: "Feasibility & Model",
    icon: Scale,
    copy: "Review unit economics, catchment footfall data, and the FOCO franchise model together.",
    side: "right",
  },
  {
    n: "03",
    title: "Sign",
    category: "Legal & Onboarding",
    icon: FileSignature,
    copy: "Execute the franchise agreement, secure territory exclusivity, and complete partner onboarding.",
    side: "left",
  },
  {
    n: "04",
    title: "Set Up",
    category: "Turnkey Fit-Out",
    icon: Wrench,
    copy: "Complete facility build-out, direct OEM equipment procurement, and coach academy training using our SOPs.",
    side: "right",
  },
  {
    n: "05",
    title: "Launch & Grow",
    category: "Opening & Scale",
    icon: Rocket,
    copy: "Open with day-one member volume, ramp recurring revenue, and scale seamlessly into additional multi-unit territories.",
    side: "center",
  },
];

export function FranchisePathRoadmap() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36 border-b border-border/20 bg-[#070707]">
      <Atmosphere variant="c" />

      {/* Atmospheric Background Glows & Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[45rem] w-[45rem] rounded-full bg-volt/5 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ───────────── SECTION HEADER ───────────── */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
              Turnkey Partner Framework · Slide 12
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white uppercase">
              YOUR PATH TO A <br />
              <span className="text-volt-gradient">POWERUP FRANCHISE</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              A structured 5-step growth roadmap taking you from initial inquiry to full territory
              launch.
            </p>
          </Reveal>
        </div>

        {/* ───────────── DESKTOP SERPENTINE WINDING ROADMAP (≥ 1024px) ───────────── */}
        <div className="relative mt-20 hidden lg:block">
          {/* Continuous Winding Road SVG Background Ribbon */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 900"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Road Ribbon Gradient */}
                <linearGradient id="roadGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#141414" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#1e1e1e" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#252525" stopOpacity="0.9" />
                </linearGradient>

                {/* Volt Border Glow Gradient */}
                <linearGradient id="voltTrackGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffde47" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#ffde47" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffde47" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* 3D Winding Highway Ribbon Base */}
              <path
                d="M 220 820 C 350 820, 680 720, 720 580 C 760 440, 320 380, 280 250 C 240 120, 520 80, 680 80"
                fill="none"
                stroke="url(#roadGradient)"
                strokeWidth="56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing Outer Edge Borders */}
              <path
                d="M 220 820 C 350 820, 680 720, 720 580 C 760 440, 320 380, 280 250 C 240 120, 520 80, 680 80"
                fill="none"
                stroke="url(#voltTrackGlow)"
                strokeWidth="58"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40 blur-xs"
              />

              {/* Center Dashed Highway Line */}
              <path
                d="M 220 820 C 350 820, 680 720, 720 580 C 760 440, 320 380, 280 250 C 240 120, 520 80, 680 80"
                fill="none"
                stroke="#ffde47"
                strokeWidth="2"
                strokeDasharray="10 12"
                strokeOpacity="0.6"
              />
            </svg>
          </div>

          {/* 5 Sequential Interactive Waypoint Stations */}
          <div className="relative z-10 space-y-12">
            {/* ──── STAGE 01 (Bottom Left) ──── */}
            <div className="grid grid-cols-[1.1fr_auto_1.1fr] items-center gap-8">
              <Reveal delay={100}>
                <RoadmapCard step={STEPS[0]!} isLeft={true} />
              </Reveal>
              <MilestonePin num="01" isSummit={false} />
              <div className="hidden lg:block" />
            </div>

            {/* ──── STAGE 02 (Middle Right) ──── */}
            <div className="grid grid-cols-[1.1fr_auto_1.1fr] items-center gap-8">
              <div className="hidden lg:block" />
              <MilestonePin num="02" isSummit={false} />
              <Reveal delay={150}>
                <RoadmapCard step={STEPS[1]!} isLeft={false} />
              </Reveal>
            </div>

            {/* ──── STAGE 03 (Middle Left) ──── */}
            <div className="grid grid-cols-[1.1fr_auto_1.1fr] items-center gap-8">
              <Reveal delay={200}>
                <RoadmapCard step={STEPS[2]!} isLeft={true} />
              </Reveal>
              <MilestonePin num="03" isSummit={false} />
              <div className="hidden lg:block" />
            </div>

            {/* ──── STAGE 04 (Middle Right) ──── */}
            <div className="grid grid-cols-[1.1fr_auto_1.1fr] items-center gap-8">
              <div className="hidden lg:block" />
              <MilestonePin num="04" isSummit={false} />
              <Reveal delay={250}>
                <RoadmapCard step={STEPS[3]!} isLeft={false} />
              </Reveal>
            </div>

            {/* ──── STAGE 05 (Summit / Launch Finish Point) ──── */}
            <div className="pt-8 flex flex-col items-center">
              <div className="mb-6 flex items-center justify-center">
                <MilestonePin num="05" isSummit={true} />
              </div>

              <Reveal delay={300}>
                <div className="w-full max-w-2xl rounded-[2.5rem] glass-strong bg-carbon-deep/95 border-2 border-volt/70 p-8 sm:p-10 text-center shadow-[0_20px_60px_-15px_rgba(255,222,71,0.25)] transition-all duration-500 hover:border-volt hover:scale-[1.01]">
                  <div className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-carbon mb-3">
                    <Sparkles className="h-3.5 w-3.5" />
                    Milestone 05 · Grand Opening
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase font-black text-white">
                    {STEPS[4]!.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                    {STEPS[4]!.copy}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-volt">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Day-One Members
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Scalable Multi-Unit
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ───────────── MOBILE & TABLET BLUEPRINT TIMELINE (< 1024px) ───────────── */}
        <div className="mt-16 block lg:hidden">
          <div className="relative pl-7 sm:pl-10 space-y-7">
            {/* Winding Vertical Guide Ribbon */}
            <div className="absolute top-4 bottom-10 left-3.5 sm:left-5 w-1 bg-linear-to-b from-volt via-volt/60 to-volt/20 rounded-full" />

            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === STEPS.length - 1;

              return (
                <Reveal key={step.n} delay={idx * 60}>
                  <div className="relative group">
                    {/* Glowing Pin Marker */}
                    <div className="absolute -left-7 sm:-left-10 top-7 -translate-x-1/2 flex items-center justify-center">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-full text-xs font-display font-black shadow-[0_0_15px_rgba(255,222,71,0.5)] ${
                          isLast
                            ? "bg-volt text-carbon"
                            : "bg-carbon border-2 border-volt text-volt"
                        }`}
                      >
                        {step.n}
                      </div>
                    </div>

                    {/* Smoked Glass Card */}
                    <div
                      className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-7 transition-all duration-300 ${
                        isLast
                          ? "glass-strong bg-carbon-deep/95 border-2 border-volt/70 shadow-[0_15px_40px_rgba(255,222,71,0.2)]"
                          : "glass-strong bg-carbon-deep/85 border border-white/10 hover:border-volt/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-volt/15 text-volt border border-volt/30">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.18em] text-volt font-display">
                            {step.category}
                          </p>
                          <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {step.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────── PINPOINT MILESTONE MARKER (Matching Template Teardrop Pin) ─────────────
function MilestonePin({ num, isSummit }: { num: string; isSummit: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center group cursor-pointer">
      {/* Outer Pulse */}
      <div className="absolute -inset-2 rounded-full bg-volt/20 blur-sm group-hover:bg-volt/40 transition-all duration-300" />

      {/* Pin Body */}
      <div
        className={`relative grid h-14 w-14 place-items-center rounded-full border-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,222,71,0.4)] group-hover:scale-110 ${
          isSummit ? "bg-volt border-white text-carbon" : "bg-[#111111] border-volt text-volt"
        }`}
      >
        <span className="font-display text-lg font-black">{num}</span>
      </div>

      {/* Bottom Pointer Stem */}
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-volt -mt-0.5" />
    </div>
  );
}

// ───────────── ROADMAP CALLOUT CARD ─────────────
function RoadmapCard({ step, isLeft }: { step: PathStep; isLeft: boolean }) {
  const Icon = step.icon;

  return (
    <div
      className={`group relative w-full max-w-[420px] overflow-hidden rounded-[2.2rem] glass-strong bg-carbon-deep/90 border border-white/10 p-7 lg:p-8 transition-all duration-500 hover:border-volt/60 hover:shadow-[0_20px_50px_-15px_rgba(255,222,71,0.2)] hover:-translate-y-1 ${
        isLeft ? "ml-auto" : "mr-auto"
      }`}
    >
      {/* Ambient Top Glow on Hover */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-32 w-32 rounded-full bg-volt/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-20" />

      {/* Header: Icon & Category */}
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30 group-hover:bg-volt group-hover:text-carbon transition-all duration-300">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-neutral-400 border border-border/50 group-hover:text-volt group-hover:border-volt/40 transition-colors">
          Step {step.n}
        </span>
      </div>

      {/* Category Tag */}
      <p className="mt-4 text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.18em] text-volt font-display">
        {step.category}
      </p>

      {/* Title */}
      <h3 className="mt-1 font-display text-2xl lg:text-3xl font-black uppercase leading-tight text-white group-hover:text-volt transition-colors">
        {step.title}
      </h3>

      {/* Copy */}
      <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.copy}</p>

      {/* Bottom Accent Track */}
      <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
        <span className="text-[0.6rem] font-mono uppercase tracking-wider text-neutral-500">
          Stage {step.n} of 05
        </span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-volt/40 group-hover:bg-volt transition-colors" />
          <span className="h-1.5 w-4 rounded-full bg-border/60 group-hover:bg-volt transition-colors" />
        </div>
      </div>
    </div>
  );
}
