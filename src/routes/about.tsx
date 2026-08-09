import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "../components/Atmosphere";
import { Reveal } from "../components/Reveal";
import { PowerButton } from "../components/PowerButton";
import facility from "../assets/facility.jpg";
import {
  Compass,
  Eye,
  ShieldCheck,
  Target,
  HeartHandshake,
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Dumbbell,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Mission, Vision & Core Values | PowerUp Fitness Pune" },
      {
        name: "description",
        content:
          "Our mission, vision, and core values that drive PowerUp Fitness across Pune — empowering individuals to lead healthier, stronger, and more confident lives.",
      },
      {
        property: "og:title",
        content: "About Us — Mission, Vision & Core Values | PowerUp Fitness Pune",
      },
      {
        property: "og:description",
        content:
          "Empowering people to lead healthier, stronger, more confident lives with world-class facilities and coaching.",
      },
    ],
  }),
  component: About,
});

const CORE_VALUES = [
  {
    n: "01",
    title: "Integrity and Respect",
    copy: "We operate with absolute transparency, honesty, and mutual respect for every member, coach, and partner who walks through our doors.",
    icon: ShieldCheck,
  },
  {
    n: "02",
    title: "Committed to Customer Goals",
    copy: "Be relentlessly committed in encouraging and coaching our customers to conquer their fitness, strength, and athletic milestones.",
    icon: Target,
  },
  {
    n: "03",
    title: "Compassionate to Client Needs",
    copy: "Being deeply attuned and compassionate to each client's unique physical needs, lifestyle constraints, and personal fitness aspirations.",
    icon: HeartHandshake,
  },
  {
    n: "04",
    title: "Being the Best Coaches",
    copy: "Upholding the highest benchmarks of technical biomechanics, athletic science, and empathetic mentoring on the gym floor.",
    icon: Award,
  },
  {
    n: "05",
    title: "Exceed Expectations",
    copy: "Going beyond the workout in facility hygiene, equipment calibration, member care, and delivering measurable transformations.",
    icon: Sparkles,
  },
  {
    n: "06",
    title: "Constantly Learn & Improve",
    copy: "Relentlessly refining our training methodologies, operational SOPs, and community experiences to set new industry standards.",
    icon: TrendingUp,
  },
];

const TIMELINE = [
  [
    "01",
    "State-of-the-art equipment",
    "Isolation machines, Olympic lifting platforms, and functional rigs selected for biomechanical precision.",
  ],
  [
    "02",
    "Group exercise zones",
    "Programmed HIIT, CrossFit, Yoga, and Zumba classes for every endurance level in dedicated studios.",
  ],
  [
    "03",
    "Personal training studios",
    "One-to-one coaching floors led by certified biomechanics specialists and transformation mentors.",
  ],
  [
    "04",
    "Spacious recovery lounges",
    "Luxury showers, digital lockers, recovery zones, and an in-house healthy café & nutrition desk.",
  ],
];

function About() {
  return (
    <>
      {/* ───────────── 1. HERO SECTION ───────────── */}
      <section className="relative overflow-hidden pt-40 pb-24 border-b border-border/20">
        <Atmosphere variant="b" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
              PowerUp Fitness · Pune
            </div>
            <h1 className="mt-6 font-display text-[clamp(4rem,13vw,10rem)] leading-[0.78] tracking-tight uppercase">
              ABOUT
              <br />
              <span className="text-volt-gradient">POWERUP</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed">
              Transforming lives and building a healthier community through elite coaching,
              biomechanical precision, and an uncompromised standard of fitness excellence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 2. OUR STORY & ROOTS ───────────── */}
      <section className="relative overflow-hidden py-24 border-b border-border/20">
        <Atmosphere variant="c" />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt font-bold">
              The Heritage
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.82] uppercase text-white">
              OUR <span className="text-volt">STORY</span>
            </h2>
            <p className="mt-8 leading-relaxed text-sm sm:text-base text-muted-foreground">
              PowerUp Fitness was born from a singular conviction: that fitness should be
              results-driven, accessible, and transformative. We set out to engineer facilities
              where every member feels empowered, challenged, and supported by a world-class team.
            </p>
            <p className="mt-5 leading-relaxed text-sm sm:text-base text-muted-foreground">
              Operating across Pune in <span className="text-foreground font-semibold">Bhukum</span>{" "}
              and <span className="text-foreground font-semibold">Mahalunge</span>, with our upcoming
              flagship at <span className="text-foreground font-semibold">Baner-Sus</span>, our clubs
              offer world-class equipment, certified coaches, and an electric community atmosphere.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PowerButton to="/contact" variant="volt">
                Start your journey
              </PowerButton>
              <PowerButton to="/franchise" variant="ghost">
                Partner with us
              </PowerButton>
            </div>
          </Reveal>

          <Reveal delay={140} className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 shadow-2xl">
              <img
                src={facility}
                alt="Power Up Fitness premium training floor"
                loading="lazy"
                width={1600}
                height={1104}
                className="h-[30rem] w-full object-cover brightness-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-carbon-deep via-transparent to-transparent opacity-80" />
            </div>
            <div className="absolute -left-6 bottom-8 clay rounded-3xl px-7 py-5 border border-volt/30 animate-float-soft shadow-xl">
              <p className="font-display text-4xl leading-none text-volt">5,000+</p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground font-bold">
                Transformed Lives
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 3. OUR MISSION & OUR VISION ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20 bg-[#070707]">
        <Atmosphere variant="d" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt font-bold text-center">
              Purpose & Direction
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.85] text-center text-white uppercase">
              MISSION & <span className="text-volt">VISION</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* 1. OUR MISSION CARD */}
            <Reveal delay={100}>
              <div className="group relative h-full rounded-[2.5rem] glass-strong bg-carbon-deep/95 border-2 border-white/10 p-8 sm:p-12 transition-all duration-500 hover:border-volt/70 hover:shadow-[0_25px_60px_-15px_rgba(255,222,71,0.2)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30 group-hover:bg-volt group-hover:text-carbon transition-colors duration-300">
                      <Compass className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-volt">
                      Our Mission
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-volt transition-colors">
                    OUR MISSION
                  </h3>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                    Our mission is to empower individuals to lead healthier, stronger, and more
                    confident lives by providing world-class fitness facilities, expert guidance,
                    and a supportive community that makes fitness accessible and sustainable for
                    everyone.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-volt uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Accessible · Sustainable · Empowering</span>
                </div>
              </div>
            </Reveal>

            {/* 2. OUR VISION CARD */}
            <Reveal delay={200}>
              <div className="group relative h-full rounded-[2.5rem] glass-strong bg-carbon-deep/95 border-2 border-volt/50 p-8 sm:p-12 transition-all duration-500 hover:border-volt hover:shadow-[0_25px_60px_-15px_rgba(255,222,71,0.3)] shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-volt text-carbon shadow-[0_0_20px_rgba(255,222,71,0.4)]">
                      <Eye className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-volt px-4 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-carbon">
                      Our Vision
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-volt transition-colors">
                    OUR VISION
                  </h3>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                    To be the undisputed leader in premium fitness across Pune, recognized for
                    uncompromised quality, elite coaching, and architectural excellence.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-volt uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Quality · Coaching · Architectural Excellence</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 4. CORE VALUES (6 FOUNDATIONAL PRINCIPLES) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="a" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt font-bold text-center">
              The Six Principles
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.85] text-center text-white uppercase">
              CORE <span className="text-volt">VALUES</span>
            </h2>
            <p className="mt-4 text-center max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
              The foundational ethics that guide how we train, coach, support, and grow together
              every single day.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Reveal key={val.n} delay={idx * 70}>
                  <div className="group relative h-full flex flex-col justify-between rounded-[2.2rem] glass-strong bg-carbon-deep/90 border border-white/10 p-8 transition-all duration-500 hover:border-volt/60 hover:shadow-[0_20px_50px_-15px_rgba(255,222,71,0.2)] hover:-translate-y-1.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-4xl font-black text-muted-foreground/30 group-hover:text-volt transition-colors">
                          {val.n}
                        </span>
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30 group-hover:bg-volt group-hover:text-carbon transition-all duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="mt-6 font-display text-2xl font-black uppercase leading-tight text-white group-hover:text-volt transition-colors">
                        {val.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {val.copy}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[0.62rem] font-mono text-neutral-500">
                      <span>Principle {val.n} of 06</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-volt/50 group-hover:bg-volt transition-colors" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 5. THE POWERUP EXPERIENCE ───────────── */}
      <section className="relative overflow-hidden py-28">
        <Atmosphere variant="c" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt font-bold">
              Facility Standard
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.82] uppercase text-white">
              THE POWERUP <br />
              <span className="text-volt">EXPERIENCE</span>
            </h2>
          </Reveal>

          <div className="mt-14 border-l-2 border-volt/30 pl-8 sm:pl-12 space-y-12">
            {TIMELINE.map(([n, title, copy], i) => (
              <Reveal key={n} delay={i * 90}>
                <div className="relative group">
                  <span className="absolute -left-[3.05rem] sm:-left-[4.05rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-volt font-display text-carbon text-sm font-black shadow-[0_0_12px_rgba(255,222,71,0.4)]">
                    {n}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase font-black text-white group-hover:text-volt transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
