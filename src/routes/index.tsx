import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Atmosphere } from "../components/Atmosphere";
import { Reveal } from "../components/Reveal";
import { PowerButton } from "../components/PowerButton";
import { CinematicHero } from "../components/CinematicHero";
import { EnquiryModal } from "../components/EnquiryModal";
import { PowerUpAdvantage } from "../components/PowerUpAdvantage";
import { CoreValues } from "../components/CoreValues";
import { BeyondWorkout } from "../components/BeyondWorkout";
import { BRANCHES, PROGRAMS, TESTIMONIALS, WHATSAPP } from "../components/site";
import facility from "../assets/facility.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Power Up Fitness — Premium Gym & Transformation, Pune" },
      {
        name: "description",
        content:
          "Hard work pays off. Power Up Fitness delivers elite biomechanics, expert coaching and premium training clubs in Bhukum and Mahalunge, Pune.",
      },
      { property: "og:title", content: "Power Up Fitness — Premium Gym & Transformation, Pune" },
      {
        property: "og:description",
        content: "Elite biomechanics, expert coaching and a community built on progression.",
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { value: "18/7", label: "Working Hours" },
  { value: "5,000+", label: "Happy Members" },
  { value: "2+", label: "Premium Branches" },
  { value: "12+", label: "In-House Trainers" },
];

function Index() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [program, setProgram] = useState(0);
  const [quote, setQuote] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const branch = BRANCHES[activeBranch]!;

  // Trigger enquiry popup after a short cinematic entrance delay on homepage entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnquiryOpen(true);
    }, 1100);

    const handleOpenEnquiry = () => setIsEnquiryOpen(true);
    window.addEventListener("open-enquiry-modal", handleOpenEnquiry);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-enquiry-modal", handleOpenEnquiry);
    };
  }, []);

  return (
    <>
      {/* ───────────── 1. CINEMATIC HERO ───────────── */}
      <CinematicHero />

      {/* ───────────── PREMIUM ENQUIRY POPUP ───────────── */}
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />

      {/* ───────────── 2. ABOUT / STATS ───────────── */}
      <section className="relative overflow-hidden py-28">
        <Atmosphere variant="b" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <h2 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.8]">
                ABOUT
                <br />
                <span className="text-volt">US</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Power Up Fitness is committed to transforming lives and building a healthier
                community through personalised coaching and expert guidance. We offer an extensive
                range of programs designed to fuel your transformative fitness journey.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PowerButton to="/about" variant="slab">
                  Read the story
                </PowerButton>
                <PowerButton href={WHATSAPP} variant="ghost">
                  Become a member
                </PowerButton>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="metal p-7">
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-volt">{s.label}</p>
                  <p className="mt-4 font-display text-4xl sm:text-5xl leading-none text-foreground">
                    {s.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 3. THE POWERUP ADVANTAGE ───────────── */}
      <PowerUpAdvantage />

      {/* ───────────── 4. CORE VALUES (MOUNTAIN DECK) ───────────── */}
      <CoreValues />

      {/* ───────────── 5. BEYOND THE WORKOUT ───────────── */}
      <BeyondWorkout />

      {/* ───────────── 6. CLUBS / BRANCHES ───────────── */}
      <section className="relative overflow-hidden py-28 border-t border-border/20">
        <Atmosphere variant="c" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt">Pune Locations</p>
              <h2 className="mt-3 font-display text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.82]">
                OUR <span className="text-volt">CLUBS</span>
              </h2>
            </Reveal>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((b, i) => {
                const isUpcoming = b.status === "upcoming";

                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBranch(i)}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      activeBranch === i
                        ? "bg-volt text-carbon shadow-[0_10px_30px_-10px_var(--volt)]"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{b.name}</span>
                    {isUpcoming && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider ${
                          activeBranch === i
                            ? "bg-carbon text-volt"
                            : "bg-volt/20 text-volt border border-volt/40"
                        }`}
                      >
                        Coming Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border/40 aspect-4/3 sm:aspect-16/10">
                <img
                  src={facility}
                  alt={`Power Up Fitness ${branch.name}`}
                  className={`h-full w-full object-cover transition-transform duration-700 hover:scale-105 ${
                    branch.status === "upcoming" ? "brightness-75 contrast-125" : ""
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-carbon-deep via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] ${
                        branch.status === "upcoming"
                          ? "bg-volt text-carbon font-bold shadow-[0_0_15px_rgba(255,222,71,0.5)]"
                          : "glass text-volt"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          branch.status === "upcoming" ? "bg-carbon animate-pulse" : "bg-volt animate-pulse"
                        }`}
                      />
                      {branch.status === "upcoming"
                        ? "Upcoming Club · Coming Soon"
                        : `Live Occupancy: ${branch.occupancy}`}
                    </span>
                    <h3 className="mt-2 font-display text-4xl leading-none">
                      POWER UP <span className="text-volt">{branch.name.toUpperCase()}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex h-full flex-col justify-between gap-8 rounded-3xl glass-strong p-8 sm:p-10">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-volt">Address</p>
                    {branch.status === "upcoming" && (
                      <span className="rounded-full bg-volt/20 border border-volt/40 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt">
                        Upcoming Club
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                    {branch.status === "upcoming"
                      ? "A new PowerUp experience is coming to Baner-Sus, Pune. Register your interest below to receive opening announcements and founding member passes."
                      : branch.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-border/30 py-6">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                      Status
                    </p>
                    <p className="mt-1 font-display text-2xl text-foreground">
                      {branch.status === "upcoming" ? "Coming Soon" : "6 AM – 12 AM"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                      Coaches
                    </p>
                    <p className="mt-1 font-display text-2xl text-volt">Certified</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {branch.status === "upcoming" ? (
                    <>
                      <PowerButton to="/contact" variant="volt">
                        Register Interest
                      </PowerButton>
                      <PowerButton to="/franchise" variant="ghost">
                        Franchise Info
                      </PowerButton>
                    </>
                  ) : (
                    <>
                      {branch.maps && (
                        <PowerButton href={branch.maps} variant="volt">
                          Get directions
                        </PowerButton>
                      )}
                      <PowerButton to="/contact" variant="ghost">
                        Book trial
                      </PowerButton>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 7. PROGRAMS ───────────── */}
      <section className="relative overflow-hidden py-28 border-t border-border/20">
        <Atmosphere variant="a" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt">Training Domains</p>
            <h2 className="mt-3 font-display text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.82]">
              WHAT WE <span className="text-volt">OFFER</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div
                  onMouseEnter={() => setProgram(i)}
                  className={`group relative flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-500 cursor-pointer ${
                    program === i
                      ? "glass-strong border-volt/50 shadow-[0_20px_50px_-20px_rgba(255,222,71,0.25)] -translate-y-1"
                      : "glass hover:border-border/60"
                  }`}
                >
                  <div>
                    <span className="font-display text-xs text-muted-foreground">{p.tag}</span>
                    <h3 className="mt-6 font-display text-2xl leading-none text-foreground group-hover:text-volt transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{p.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 8. TESTIMONIALS ───────────── */}
      <section className="relative overflow-hidden py-28 border-t border-border/20">
        <Atmosphere variant="d" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-volt">Community Voices</p>
            <h2 className="mt-3 font-display text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.85]">
              MEMBER <span className="text-volt">EXPERIENCE</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <blockquote className="mt-10 text-2xl font-light leading-relaxed sm:text-3xl">
              “{TESTIMONIALS[quote]!.quote}”
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              — {TESTIMONIALS[quote]!.name}
            </p>
          </Reveal>
          <div className="mt-10 flex justify-center gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setQuote(i)}
                aria-label={`Testimonial by ${t.name}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  quote === i ? "w-10 bg-volt" : "w-2.5 bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 9. CTA ───────────── */}
      <section className="relative overflow-hidden py-32 border-t border-border/20">
        <Atmosphere variant="a" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[3rem] glass-strong px-8 py-20 text-center">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-volt/20 blur-[100px]" />
              <p className="relative text-[0.65rem] uppercase tracking-[0.34em] text-volt">
                Transform your fitness journey
              </p>
              <h2 className="relative mt-6 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.8]">
                MASTER YOUR
                <br />
                TRAINING <span className="text-volt">TODAY</span>
              </h2>
              <div className="relative mt-12 flex flex-wrap justify-center gap-4">
                <PowerButton to="/contact">Start your journey</PowerButton>
                <PowerButton to="/branches" variant="ghost">
                  Visit a club
                </PowerButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
