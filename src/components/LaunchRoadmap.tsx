import { Reveal } from "./Reveal";
import { Atmosphere } from "./Atmosphere";
import {
  Compass,
  LayoutGrid,
  Dumbbell,
  GraduationCap,
  Megaphone,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface StepData {
  step: string;
  icon: typeof Compass;
  title: string;
  category: string;
  copy: string;
}

const STEPS: StepData[] = [
  {
    step: "01",
    icon: Compass,
    title: "Site Scouting & Feasibility",
    category: "Territory & Location",
    copy: "Demographic catchment analysis, footfall assessment, competitor evaluation, and lease negotiation support.",
  },
  {
    step: "02",
    icon: LayoutGrid,
    title: "3D CAD & Architectural Layout",
    category: "Facility Engineering",
    copy: "Precision floor planning for strength zones, cardio decks, private studios, luxury showers, and member lounges.",
  },
  {
    step: "03",
    icon: Dumbbell,
    title: "Equipment Procurement",
    category: "Machinery & Biomechanics",
    copy: "Direct-to-manufacturer commercial pricing on biomechanically calibrated machinery, rigs, and free weights.",
  },
  {
    step: "04",
    icon: GraduationCap,
    title: "Coach Recruitment & Training",
    category: "Academy & Staffing",
    copy: "Hiring, testing, and onboarding coaches on PowerUp form correction, hypertrophy sequencing, and client retention.",
  },
  {
    step: "05",
    icon: Megaphone,
    title: "Pre-Launch Marketing Engine",
    category: "Member Acquisition",
    copy: "Targeted digital advertising, Founder Membership presales, and experiential launch marketing.",
  },
  {
    step: "06",
    icon: Sliders,
    title: "Tech Stack & Operations",
    category: "Systems & SOPs",
    copy: "Integrated CRM, RFID access turnstiles, trainer KPI tracking, and weekly operational review playbooks.",
  },
];

export function LaunchRoadmap() {
  return (
    <section className="relative overflow-hidden py-28 border-b border-border/20">
      <Atmosphere variant="d" />

      {/* Blueprint Grid Watermark Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[38rem] w-[38rem] rounded-full bg-volt/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ───────────── SECTION HEADER ───────────── */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
              Turnkey Strategic Blueprint
            </div>
            <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.82] tracking-tight">
              THE LAUNCH <span className="text-volt-gradient">ROADMAP</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              From site scouting to grand opening day, our experienced project team guides every
              phase of your facility build through a structured 6-stage sequential framework.
            </p>
          </Reveal>
        </div>

        {/* ───────────── DESKTOP DIAGRAMMATIC ROADMAP (≥ 1024px) ───────────── */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            {/* ──── ROW 1: Stages 01 → 02 → 03 ──── */}
            <div className="grid grid-cols-3 gap-6 relative z-10">
              {STEPS.slice(0, 3).map((item, idx) => (
                <RoadmapNode key={item.step} item={item} index={idx} isRowOne={true} />
              ))}
            </div>

            {/* Connecting Circuit Flow between Row 1 & Row 2 */}
            <div className="relative h-16 my-2 flex items-center justify-end pr-16 z-0">
              <svg
                className="w-full h-full absolute inset-0 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="voltCircuit" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffde47" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#ffde47" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffde47" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Horizontal connectors for Row 1 */}
                <line
                  x1="28%"
                  y1="-28px"
                  x2="38%"
                  y2="-28px"
                  stroke="url(#voltCircuit)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <line
                  x1="62%"
                  y1="-28px"
                  x2="71%"
                  y2="-28px"
                  stroke="url(#voltCircuit)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Downward Loop from 03 to 04 */}
                <path
                  d="M 83% 0 C 83% 32, 17% 32, 17% 64"
                  fill="none"
                  stroke="#ffde47"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Direction Indicator */}
              <div className="flex items-center gap-2 rounded-full glass px-4 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-volt border border-volt/30 shadow-[0_0_15px_rgba(255,222,71,0.15)]">
                <span>Phase Transition</span>
                <ArrowRight className="h-3 w-3 animate-pulse" />
              </div>
            </div>

            {/* ──── ROW 2: Stages 04 → 05 → 06 ──── */}
            <div className="grid grid-cols-3 gap-6 relative z-10">
              {STEPS.slice(3, 6).map((item, idx) => (
                <RoadmapNode key={item.step} item={item} index={idx + 3} isRowOne={false} />
              ))}
            </div>

            {/* ──── CONNECTOR LINE TO GRAND OPENING ──── */}
            <div className="flex flex-col items-center my-8 z-0">
              <div className="h-10 w-px bg-linear-to-b from-volt/60 via-volt to-volt/80" />
              <div className="h-2 w-2 rounded-full bg-volt animate-ping" />
            </div>

            {/* ──── FINAL ENDPOINT: POWERUP GRAND OPENING ──── */}
            <div className="max-w-xl mx-auto relative z-10">
              <Reveal delay={200}>
                <div className="group relative overflow-hidden rounded-[2.2rem] glass-strong bg-carbon-deep/95 border-2 border-volt/50 p-8 text-center shadow-[0_20px_60px_-15px_rgba(255,222,71,0.25)] transition-all duration-500 hover:border-volt hover:scale-[1.01]">
                  <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-volt/15 blur-3xl" />

                  <div className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-1 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-carbon">
                    <Sparkles className="h-3.5 w-3.5" />
                    Milestone 07 · Grand Opening
                  </div>

                  <h3 className="mt-4 font-display text-3xl sm:text-4xl uppercase leading-none tracking-tight text-foreground">
                    POWERUP FITNESS <span className="text-volt">READY FOR LAUNCH</span>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Turnkey facility live, Founding Memberships onboarded, certified coaching squad
                    operational, and territory dominance established.
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-foreground/80 border-t border-border/30 pt-4">
                    <span className="flex items-center gap-1.5 text-volt">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Turnkey Handover
                    </span>
                    <span className="flex items-center gap-1.5 text-volt">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Day-One Cashflow
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ───────────── TABLET & MOBILE BLUEPRINT TIMELINE (< 1024px) ───────────── */}
        <div className="mt-16 block lg:hidden">
          <div className="relative pl-6 sm:pl-10 space-y-6">
            {/* Vertical Glowing Guide Track */}
            <div className="absolute top-4 bottom-12 left-2.5 sm:left-4.5 w-0.5 bg-linear-to-b from-volt via-volt/60 to-volt/20" />

            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.step} delay={idx * 60}>
                  <div className="relative group">
                    {/* Glowing Circular Timeline Node Pin */}
                    <div className="absolute -left-6 sm:-left-10 top-6 -translate-x-1/2 flex items-center justify-center">
                      <div className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-carbon border-2 border-volt text-[0.55rem] sm:text-[0.6rem] font-display font-black text-volt shadow-[0_0_12px_rgba(255,222,71,0.5)]">
                        {item.step}
                      </div>
                    </div>

                    {/* Node Glass Card */}
                    <div className="relative overflow-hidden rounded-[1.8rem] glass-strong bg-carbon-deep/90 border border-border/40 p-6 sm:p-7 transition-all duration-300 hover:border-volt/60">
                      {/* Watermark Step Number */}
                      <span className="pointer-events-none absolute right-4 top-2 font-display text-5xl font-black text-muted-foreground/10 select-none">
                        {item.step}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl glass border border-volt/30 text-volt">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-volt">
                            {item.category}
                          </p>
                          <h3 className="font-display text-xl sm:text-2xl leading-tight text-foreground">
                            {item.title.toUpperCase()}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Mobile Grand Opening Milestone Endpoint */}
            <Reveal delay={300}>
              <div className="relative group pt-4">
                <div className="absolute -left-6 sm:-left-10 top-10 -translate-x-1/2 flex items-center justify-center">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-volt text-carbon shadow-[0_0_16px_rgba(255,222,71,0.8)]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] glass-strong bg-carbon-deep/95 border-2 border-volt/60 p-6 sm:p-8 shadow-[0_15px_40px_-10px_rgba(255,222,71,0.25)]">
                  <div className="inline-flex items-center gap-2 rounded-full bg-volt px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.26em] text-carbon mb-2">
                    Milestone 07 · Launch
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase leading-none text-foreground">
                    POWERUP <span className="text-volt">GRAND OPENING</span>
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Turnkey facility live, member roster active, and coaches operational.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────── DESKTOP COMPACT NODE COMPONENT ─────────────
function RoadmapNode({
  item,
  index,
  isRowOne,
}: {
  item: StepData;
  index: number;
  isRowOne: boolean;
}) {
  const Icon = item.icon;

  return (
    <Reveal delay={index * 80}>
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] glass-strong bg-carbon-deep/90 border border-border/40 p-7 transition-all duration-500 hover:border-volt/60 hover:shadow-[0_20px_45px_-15px_rgba(255,222,71,0.2)] hover:-translate-y-1">
        {/* Large Subtle Step Number Watermark */}
        <span className="pointer-events-none absolute right-5 top-4 font-display text-6xl font-black text-muted-foreground/10 group-hover:text-volt/20 transition-colors duration-500 select-none">
          {item.step}
        </span>

        {/* Ambient Top Glow on hover */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-32 w-32 rounded-full bg-volt/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-20" />

        <div>
          {/* Header Row: Small Circular Glass Icon + Step Badge */}
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-full glass border border-volt/35 text-volt group-hover:bg-volt group-hover:text-carbon group-hover:border-volt transition-all duration-300">
              <Icon className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-carbon px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-muted-foreground border border-border/50 group-hover:text-volt group-hover:border-volt/40 transition-colors">
              Phase {item.step}
            </span>
          </div>

          {/* Category Tag */}
          <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-volt">
            {item.category}
          </p>

          {/* Title */}
          <h3 className="mt-1.5 font-display text-2xl leading-tight text-foreground group-hover:text-volt transition-colors">
            {item.title.toUpperCase()}
          </h3>

          {/* Detailed Copy */}
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.copy}</p>
        </div>

        {/* Bottom Status / Connectivity Line */}
        <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
          <span className="text-[0.6rem] font-mono uppercase tracking-wider text-muted-foreground/70">
            Stage {item.step} of 06
          </span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-volt/40 group-hover:bg-volt transition-colors" />
            <span className="h-1.5 w-4 rounded-full bg-border/60 group-hover:bg-volt transition-colors" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
