import { Reveal } from "./Reveal";
import { Atmosphere } from "./Atmosphere";
import { ShieldCheck, Cpu, Sparkles, ArrowUpRight } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Cpu,
    tag: "01",
    title: "Certified Fitness Architects",
    copy: "Our trainers aren't floor monitors. They are certified hypertrophy and biomechanics specialists dedicated to perfecting your form, sequencing your movements, and eliminating plateaus.",
    highlight: "Biomechanics & Hypertrophy Specialists",
  },
  {
    icon: Sparkles,
    tag: "02",
    title: "Elite Biomechanics",
    copy: "We invest heavily in state-of-the-art isolation machines and functional rigs that optimize muscle recruitment, align resistance curves, and minimize joint wear.",
    highlight: "Competition-Grade Machinery",
  },
  {
    icon: ShieldCheck,
    tag: "03",
    title: "Uncompromised Hygiene",
    copy: "A clean gym is a performance gym. Our facilities undergo continuous multi-stage sanitisation protocols, filtered climate control, and spotless locker room upkeep.",
    highlight: "Multi-Stage Daily Sanitisation",
  },
];

export function PowerUpAdvantage() {
  return (
    <section className="relative overflow-hidden py-28 border-t border-border/20">
      <Atmosphere variant="b" />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              The PowerUp Difference
            </div>
            <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.82] tracking-tight">
              THE POWERUP <br />
              <span className="text-volt-gradient">ADVANTAGE</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              We go beyond simply offering a space to lift weights. We provide an engineered,
              data-driven environment designed for rapid progression, injury prevention, and
              sustainable athletic transformation.
            </p>
          </Reveal>
        </div>

        {/* 3-Card Advantage Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {ADVANTAGES.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <Reveal key={adv.title} delay={i * 100}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] glass-strong bg-carbon-deep/85 border border-border/40 p-8 transition-all duration-500 hover:border-volt/50 hover:shadow-[0_20px_50px_-20px_rgba(255,222,71,0.25)] hover:-translate-y-1.5">
                  {/* Subtle top glow */}
                  <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-volt/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-40" />

                  <div>
                    {/* Top Row: Icon & Number Tag */}
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-carbon border border-border/60 text-volt group-hover:bg-volt group-hover:text-carbon group-hover:border-volt transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-display text-2xl font-bold text-muted-foreground/40 group-hover:text-volt transition-colors">
                        {adv.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-7 font-display text-2xl sm:text-3xl leading-tight text-foreground group-hover:text-volt transition-colors">
                      {adv.title.toUpperCase()}
                    </h3>

                    {/* Copy */}
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {adv.copy}
                    </p>
                  </div>

                  {/* Bottom Highlight Tag */}
                  <div className="mt-8 pt-5 border-t border-border/30 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[0.18em] text-volt">
                    <span>{adv.highlight}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
