import { Reveal } from "./Reveal";
import { Atmosphere } from "./Atmosphere";
import { Users, Zap, Target, Dumbbell } from "lucide-react";

const PILLARS = [
  {
    n: "01",
    icon: Users,
    title: "Group Exercise",
    category: "High-Energy Conditioning",
    copy: "Revolutionising fitness with cutting-edge group programs tailored to all endurance levels. Dynamic, music-fueled functional training that challenges cardiovascular stamina and builds camaraderie.",
  },
  {
    n: "02",
    icon: Zap,
    title: "Good Vibes",
    category: "Community Culture",
    copy: "Elevate your mood, mindset, and energy within a supportive, zero-ego community. An electric training atmosphere engineered to push you through tough reps with infectious motivation.",
  },
  {
    n: "03",
    icon: Target,
    title: "Personal Training",
    category: "Precision Coaching",
    copy: "Push your limits and achieve peak athletic performance with dynamic, high-intensity 1-on-1 coaching. Periodised programming, form correction, and custom nutritional guidance for your exact physiology.",
  },
  {
    n: "04",
    icon: Dumbbell,
    title: "Fitness Innovation",
    category: "Next-Gen Machinery",
    copy: "Fuel your body for success with world-class equipment and biomechanically guided isolation rigs. Every piece of machinery is calibrated for optimal resistance curves and maximum muscular load.",
  },
];

export function CorePillars() {
  return (
    <section className="relative overflow-hidden py-28 border-t border-border/20">
      <Atmosphere variant="d" />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              Chapter 01 · Methodology
            </div>
            <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.82] tracking-tight">
              CORE <span className="text-volt">PILLARS</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
              Four fundamental pillars that anchor our training methodology, culture, and results.
            </p>
          </Reveal>
        </div>

        {/* 2x2 Architectural Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.n} delay={i * 90}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.2rem] glass-strong bg-carbon-deep/85 border border-border/40 p-8 sm:p-10 transition-all duration-500 hover:border-volt/60 hover:shadow-[0_20px_50px_-20px_rgba(255,222,71,0.2)] hover:-translate-y-1.5">
                  {/* Subtle corner highlight */}
                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-volt/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-30" />

                  <div>
                    {/* Header Row: Big Index & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-display text-5xl sm:text-6xl font-black leading-none text-muted-foreground/30 group-hover:text-volt/60 transition-colors duration-500">
                        {pillar.n}
                      </span>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-carbon border border-border/50 text-volt group-hover:bg-volt group-hover:text-carbon transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Category Label */}
                    <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-volt">
                      {pillar.category}
                    </p>

                    {/* Title */}
                    <h3 className="mt-2 font-display text-3xl sm:text-4xl leading-tight text-foreground group-hover:text-volt transition-colors">
                      {pillar.title.toUpperCase()}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {pillar.copy}
                    </p>
                  </div>

                  {/* Aesthetic Bottom Accent Line */}
                  <div className="mt-8 h-1 w-12 rounded-full bg-border/60 group-hover:w-full group-hover:bg-volt transition-all duration-500" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
