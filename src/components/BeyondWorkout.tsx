import { Reveal } from "./Reveal";
import { Atmosphere } from "./Atmosphere";
import { Target, Users, Compass, Zap, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface StageItem {
  num: string;
  title: string;
  category: string;
  icon: typeof Target;
  copy: string;
}

const STAGES: StageItem[] = [
  {
    num: "01",
    title: "TRAIN WITH PURPOSE",
    category: "Foundation & Capability",
    icon: Target,
    copy: "Structured training designed to help you become stronger, fitter, and more capable in every aspect of life.",
  },
  {
    num: "02",
    title: "FIND YOUR COMMUNITY",
    category: "Belonging & Camaraderie",
    icon: Users,
    copy: "Train alongside people who push you, support you, and celebrate your progress in an electric, zero-ego atmosphere.",
  },
  {
    num: "03",
    title: "COACHING THAT CARES",
    category: "Guidance & Accountability",
    icon: Compass,
    copy: "Expert coaches who understand your personal goals and guide you toward them with precision, empathy, and form mastery.",
  },
  {
    num: "04",
    title: "BUILD THE LIFESTYLE",
    category: "Habits & High Performance",
    icon: Zap,
    copy: "Better habits, sharper discipline, and boundless daily energy — inside the gym facility and outside in your world.",
  },
  {
    num: "05",
    title: "BECOME MORE",
    category: "Total Self-Mastery",
    icon: Sparkles,
    copy: "Because true transformation isn't just about how you look in the mirror. It's about who you become through the discipline.",
  },
];

export function BeyondWorkout() {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-28 sm:py-36 border-t border-border/15">
      <Atmosphere variant="c" />

      {/* ───────────── ARCHITECTURAL BLUEPRINT GRID & GLOW ───────────── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[42rem] rounded-full bg-volt/5 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ───────────── SECTION HEADER ───────────── */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
              The Transformation Journey · Life Beyond Reps
            </div>
            <h2 className="mt-4 font-display text-[clamp(3.2rem,8.5vw,7rem)] leading-[0.82] tracking-tight text-white uppercase">
              BEYOND <span className="text-volt-gradient">THE WORKOUT</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-xl">
              Fitness is only the beginning. We build strength, confidence, discipline, and a better
              way of living.
            </p>
          </Reveal>
        </div>

        {/* ───────────── DESKTOP ALTERNATING CONNECTED JOURNEY (≥ 768px) ───────────── */}
        <div className="relative mt-24 hidden md:block">
          {/* Central Vertical Glowing Progression Conduit */}
          <div className="absolute left-1/2 top-10 bottom-24 -translate-x-1/2 w-[2px] bg-linear-to-b from-volt via-volt/60 to-volt/20 z-0">
            {/* Ambient Pulse Dot traveling down */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-volt blur-xs animate-ping" />
          </div>

          <div className="space-y-16 lg:space-y-20 relative z-10">
            {STAGES.slice(0, 4).map((stage, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.num}
                  className={`grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-10`}
                >
                  {/* Left Column (Card on Even, Empty on Odd) */}
                  {isLeft ? (
                    <Reveal delay={idx * 80} variant="left">
                      <div className="flex justify-end">
                        <JourneyCard stage={stage} isLeft={true} Icon={Icon} />
                      </div>
                    </Reveal>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Center Node Pin */}
                  <div className="relative flex items-center justify-center">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0d0d0d] border-2 border-volt text-xs font-display font-black text-volt shadow-[0_0_18px_rgba(255,222,71,0.5)] z-20 transition-transform duration-300 hover:scale-115">
                      {stage.num}
                    </div>
                  </div>

                  {/* Right Column (Card on Odd, Empty on Even) */}
                  {!isLeft ? (
                    <Reveal delay={idx * 80} variant="right">
                      <div className="flex justify-start">
                        <JourneyCard stage={stage} isLeft={false} Icon={Icon} />
                      </div>
                    </Reveal>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              );
            })}

            {/* ───────────── FINAL CULMINATION STAGE (05 — BECOME MORE) ───────────── */}
            {(() => {
              const summitStage = STAGES[4]!;
              const SummitIcon = summitStage.icon;

              return (
                <div className="relative pt-6 flex flex-col items-center">
                  {/* Culmination Node */}
                  <div className="mb-8 grid h-12 w-12 place-items-center rounded-full bg-volt text-carbon shadow-[0_0_25px_rgba(255,222,71,0.8)] z-20 animate-pulse-glow">
                    <SummitIcon className="h-6 w-6" />
                  </div>

                  <Reveal delay={200} variant="scale">
                    <div className="group relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] glass-strong bg-linear-to-b from-[#181818] via-[#0f0f0f] to-[#121212] border-2 border-volt/50 p-8 sm:p-12 text-center card-hover-fx">
                      {/* Top Ambient Glow */}
                      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-volt/15 blur-3xl animate-pulse-glow" />

                      <span className="inline-flex items-center gap-2 rounded-full bg-volt/15 border border-volt/40 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.26em] text-volt">
                        <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: "5s" }} />
                        {summitStage.category}
                      </span>

                      <h3 className="mt-5 font-display text-3xl sm:text-5xl uppercase font-black leading-none tracking-tight text-white group-hover:text-volt transition-colors">
                        {summitStage.title}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed">
                        {summitStage.copy}
                      </p>

                      {/* Final Editorial Statement */}
                      <div className="mt-6 pt-5 border-t border-border/20 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-volt">
                        <span>THE WORKOUT CHANGES YOUR BODY.</span>
                        <span className="hidden sm:inline text-neutral-600">·</span>
                        <span>THE JOURNEY CHANGES YOU.</span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })()}
          </div>
        </div>

        {/* ───────────── MOBILE VERTICAL JOURNEY (< 768px) ───────────── */}
        <div className="mt-16 block md:hidden">
          <div className="relative pl-7 sm:pl-10 space-y-7">
            {/* Continuous Vertical Glowing Line */}
            <div className="absolute top-4 bottom-10 left-3 sm:left-4.5 w-0.5 bg-linear-to-b from-volt via-volt/60 to-volt/20" />

            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isLast = idx === STAGES.length - 1;

              return (
                <Reveal key={stage.num} delay={idx * 60} variant="scale">
                  <div className="relative group">
                    {/* Glowing Circular Node Pin */}
                    <div className="absolute -left-7 sm:-left-10 top-7 -translate-x-1/2 flex items-center justify-center">
                      <div
                        className={`grid h-7 w-7 place-items-center rounded-full text-[0.6rem] font-display font-black transition-transform duration-300 group-hover:scale-110 ${
                          isLast
                            ? "bg-volt text-carbon shadow-[0_0_15px_rgba(255,222,71,0.8)]"
                            : "bg-[#0c0c0c] border-2 border-volt text-volt shadow-[0_0_10px_rgba(255,222,71,0.4)]"
                        }`}
                      >
                        {stage.num}
                      </div>
                    </div>

                    {/* Smoked Glass Card */}
                    <div
                      className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-7 card-hover-fx ${
                        isLast
                          ? "glass-strong bg-[#121212]/95 border-2 border-volt/60 shadow-[0_15px_40px_rgba(255,222,71,0.2)]"
                          : "glass-strong bg-[#121212]/85 border border-white/10 hover:border-volt/40"
                      }`}
                    >
                      {/* Large Semi-translucent Numeral Watermark */}
                      <span className="pointer-events-none absolute right-4 top-2 font-display text-5xl font-black text-neutral-800/40 select-none">
                        {stage.num}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass border border-volt/35 text-volt">
                          <Icon className="h-5 w-5 icon-bounce" />
                        </div>
                        <div>
                          <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-volt">
                            {stage.category}
                          </p>
                          <h3 className="font-display text-xl sm:text-2xl font-black leading-tight text-white">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-neutral-400">{stage.copy}</p>

                      {isLast && (
                        <div className="mt-4 pt-3 border-t border-border/30 text-[0.62rem] font-mono uppercase tracking-wider text-volt">
                          THE WORKOUT CHANGES YOUR BODY. THE JOURNEY CHANGES YOU.
                        </div>
                      )}
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

// ───────────── DESKTOP JOURNEY CARD COMPONENT ─────────────
function JourneyCard({
  stage,
  isLeft,
  Icon,
}: {
  stage: StageItem;
  isLeft: boolean;
  Icon: typeof Target;
}) {
  return (
    <div className="group relative w-full max-w-[420px] overflow-hidden rounded-[2.2rem] glass-strong bg-[#121212]/90 border border-white/10 p-7 lg:p-8 card-hover-fx">
      {/* Large Editorial Watermark Number */}
      <span
        className={`pointer-events-none absolute font-display text-6xl font-black text-neutral-800/30 group-hover:text-volt/20 transition-colors duration-500 select-none ${
          isLeft ? "right-5 top-4" : "left-5 top-4"
        }`}
      >
        {stage.num}
      </span>

      {/* Ambient Top Glow on Hover */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-32 w-32 rounded-full bg-volt/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-20 animate-pulse-glow" />

      <div>
        {/* Top Header: Icon & Category */}
        <div className="flex items-center justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-2xl glass border border-volt/35 text-volt group-hover:bg-volt group-hover:text-carbon group-hover:border-volt transition-all duration-300 shadow-sm">
            <Icon className="h-5 w-5 icon-bounce" />
          </div>
          <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-neutral-400 border border-border/50 group-hover:text-volt group-hover:border-volt/40 transition-colors">
            Stage {stage.num}
          </span>
        </div>

        {/* Category Tag */}
        <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-volt">
          {stage.category}
        </p>

        {/* Title */}
        <h3 className="mt-1.5 font-display text-2xl lg:text-3xl font-black leading-tight text-white group-hover:text-volt transition-colors">
          {stage.title}
        </h3>

        {/* Copy */}
        <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">{stage.copy}</p>
      </div>
    </div>
  );
}
