import { useState } from "react";
import { Reveal } from "./Reveal";
import {
  TrendingUp,
  Users,
  FileCheck,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface SystemPillar {
  n: string;
  stat: string;
  title: string;
  subtitle: string;
  copy: string;
  icon: typeof TrendingUp;
  highlight: string;
}

const PILLARS: SystemPillar[] = [
  {
    n: "01",
    stat: "30–35% ROI",
    title: "CAPITAL YIELD",
    subtitle: "Attractive Returns",
    copy: "High-yield return on invested capital backed by a proven, revenue-tested operating model and disciplined cost control.",
    icon: TrendingUp,
    highlight: "Revenue-Tested Model",
  },
  {
    n: "02",
    stat: "High Retention",
    title: "RECURRING CASHFLOW",
    subtitle: "Member Loyalty",
    copy: "Community-led engagement, coach accountability, and group energy keep members renewing year after year.",
    icon: Users,
    highlight: "Predictable Renewals",
  },
  {
    n: "03",
    stat: "Proven SOPs",
    title: "STANDARDISED OPS",
    subtitle: "Turnkey Playbooks",
    copy: "Documented operating procedures for sales, trainer certification, staffing, and floor hygiene make every unit repeatable.",
    icon: FileCheck,
    highlight: "Zero Guesswork",
  },
  {
    n: "04",
    stat: "Multi-Unit",
    title: "SCALABLE GROWTH",
    subtitle: "Territory Expansion",
    copy: "Architected for multi-club replication — add units across prime Tier-1 & Tier-2 catchments to compound returns.",
    icon: Layers,
    highlight: "Compound Compounding",
  },
];

export function InterlockingSystemCards() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative mt-16 sm:mt-20">
      {/* Background Architectural Grid & Technical Lines */}
      <div className="pointer-events-none absolute -inset-x-8 -inset-y-12 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,222,71,0.06),transparent_70%)]" />

      {/* ───────────── DESKTOP & TABLET CONNECTED INTERLOCKING CHAIN (≥ 1024px) ───────────── */}
      <div className="hidden lg:grid grid-cols-4 relative items-center gap-0">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          const isEven = idx % 2 === 1;

          // Overlap negative margins to create continuous interlocking chain
          const overlapClass = idx > 0 ? "-ml-6 xl:-ml-8" : "";

          return (
            <div
              key={pillar.n}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ zIndex: isHovered ? 30 : 20 - idx }}
              className={`relative transition-all duration-500 ${overlapClass}`}
            >
              {/* Connector Outer Circuit Bracket to Next Card */}
              {idx < PILLARS.length - 1 && (
                <div className="pointer-events-none absolute -right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex items-center">
                  <div className="h-[2px] w-10 bg-linear-to-r from-volt/60 to-volt/20" />
                  <div className="h-2 w-2 rounded-full border-2 border-volt bg-carbon shadow-[0_0_8px_var(--volt)]" />
                </div>
              )}

              {/* Interlocking Hexagonal/Chamfered Geometric Panel */}
              <div
                className={`group relative overflow-hidden rounded-[2rem] p-7 xl:p-8 transition-all duration-500 flex flex-col justify-between ${
                  isHovered
                    ? "bg-carbon-deep/98 border-2 border-volt/80 shadow-[0_25px_60px_-15px_rgba(255,222,71,0.25)] -translate-y-2 scale-[1.01]"
                    : isAnyHovered
                      ? "bg-carbon-deep/75 border border-white/5 opacity-80"
                      : "bg-carbon-deep/90 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                }`}
                style={{
                  clipPath:
                    "polygon(0% 12px, 12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px))",
                }}
              >
                {/* Chamfered Top Corner Notch Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-500 ${
                    isHovered
                      ? "bg-linear-to-r from-transparent via-volt to-transparent"
                      : "bg-linear-to-r from-transparent via-white/10 to-transparent"
                  }`}
                />

                {/* Ambient Internal Glow */}
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-volt/10 blur-2xl transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-20"
                  }`}
                />

                <div>
                  {/* Top Section: Editorial Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-display text-4xl xl:text-5xl font-black tracking-tight transition-colors duration-300 ${
                        isHovered ? "text-volt" : "text-white/20"
                      }`}
                    >
                      {pillar.n}
                    </span>

                    <div
                      className={`grid h-11 w-11 place-items-center rounded-2xl border transition-all duration-300 ${
                        isHovered
                          ? "bg-volt text-carbon border-volt shadow-[0_0_15px_rgba(255,222,71,0.4)]"
                          : "bg-black/60 text-volt border-volt/30"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Badge / Metric Stat */}
                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-volt">
                    <span className="h-1 w-1 rounded-full bg-volt" />
                    {pillar.stat}
                  </div>

                  {/* Title & Subtitle block with uniform height */}
                  <div className="mt-4 min-h-[4.25rem] flex flex-col justify-start">
                    <h3 className="font-display text-xl xl:text-2xl font-black uppercase tracking-tight text-white group-hover:text-volt transition-colors leading-tight">
                      {pillar.title}
                    </h3>

                    <p className="text-[0.68rem] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs xl:text-sm text-muted-foreground leading-relaxed">
                    {pillar.copy}
                  </p>
                </div>

                {/* Bottom Highlight Key Indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[0.62rem] font-mono">
                  <span className="text-neutral-500 uppercase tracking-wider">
                    System Component
                  </span>
                  <span className="text-volt font-bold uppercase">{pillar.highlight}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ───────────── TABLET & MOBILE VERTICALLY CONNECTED SEQUENCE (< 1024px) ───────────── */}
      <div className="block lg:hidden">
        <div className="relative pl-6 sm:pl-8 space-y-6">
          {/* Continuous Vertical Interconnect Circuit Line */}
          <div className="absolute top-6 bottom-6 left-3 sm:left-4 w-[2px] bg-linear-to-b from-volt via-volt/60 to-volt/20" />

          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.n} delay={idx * 70}>
                <div className="relative group">
                  {/* Connector Circuit Node on Vertical Line */}
                  <div className="absolute -left-6 sm:-left-8 top-8 -translate-x-1/2 flex items-center justify-center">
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-carbon border-2 border-volt text-[0.6rem] font-display font-black text-volt shadow-[0_0_10px_rgba(255,222,71,0.4)]">
                      {pillar.n}
                    </div>
                  </div>

                  {/* Chamfered Glass Card */}
                  <div
                    className="relative overflow-hidden rounded-[2rem] bg-carbon-deep/90 border border-white/10 p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-volt/60 hover:-translate-y-1"
                    style={{
                      clipPath:
                        "polygon(0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px))",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-volt/10 border border-volt/30 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-volt">
                        {pillar.stat}
                      </div>

                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-volt/15 text-volt border border-volt/30">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-black uppercase text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.65rem] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">
                      {pillar.subtitle}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
