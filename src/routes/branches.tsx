import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "../components/Atmosphere";
import { Reveal } from "../components/Reveal";
import { PowerButton } from "../components/PowerButton";
import { BRANCHES, WHATSAPP } from "../components/site";
import facility from "../assets/facility.jpg";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Our Clubs — Power Up Fitness Bhukum & Mahalunge" },
      {
        name: "description",
        content:
          "Two premium Power Up Fitness clubs in Pune — Bhukum and Mahalunge. Resistance training, functional zones, recovery and expert coaching.",
      },
      { property: "og:title", content: "Our Clubs — Power Up Fitness Bhukum & Mahalunge" },
      { property: "og:description", content: "Find your ultimate fitness sanctuary in Pune." },
    ],
  }),
  component: Branches,
});

const FEATURES = [
  "Resistance training",
  "Functional & CrossFit",
  "Recovery & wellness",
  "Expert coaching",
];

function Branches() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <Atmosphere variant="d" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <h1 className="font-display text-[clamp(4rem,13vw,10rem)] leading-[0.78]">
              OUR
              <br />
              <span className="text-volt-gradient">CLUBS</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              Find your ultimate fitness sanctuary in Pune.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden pb-28">
        <Atmosphere variant="b" />
        <div className="relative mx-auto max-w-6xl space-y-16 px-6">
          {BRANCHES.map((b, i) => {
            const isUpcoming = b.status === "upcoming";

            return (
              <Reveal key={b.id} delay={i * 100}>
                <article
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                    i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`overflow-hidden border transition-all duration-700 ${
                        isUpcoming
                          ? "rounded-[2.5rem] border-volt/40 shadow-[0_0_30px_rgba(255,222,71,0.15)]"
                          : i % 2
                            ? "rounded-[3rem_1rem_3rem_1rem] border-border"
                            : "clip-arch border-border"
                      }`}
                    >
                      <img
                        src={facility}
                        alt={`Power Up Fitness ${b.name} club interior`}
                        loading="lazy"
                        width={1600}
                        height={1104}
                        className={`h-80 w-full object-cover transition-transform duration-[1.2s] hover:scale-105 ${
                          isUpcoming ? "brightness-75 contrast-125" : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute left-6 top-6 rounded-full px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.24em] ${
                        isUpcoming
                          ? "bg-volt text-carbon shadow-[0_0_20px_rgba(255,222,71,0.5)]"
                          : "glass-strong text-volt"
                      }`}
                    >
                      {isUpcoming ? "Coming Soon · Upcoming Club" : `Live: ${b.occupancy}`}
                    </span>
                  </div>

                  <div
                    className={`min-w-0 p-9 transition-all duration-300 ${
                      isUpcoming
                        ? "glass-strong bg-carbon-deep/95 border-2 border-volt/40 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(255,222,71,0.15)]"
                        : "metal clip-notch"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-[0.62rem] uppercase tracking-[0.3em] text-volt">{b.city}</p>
                      {isUpcoming && (
                        <span className="rounded-full bg-volt/20 border border-volt/50 px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 font-display text-5xl sm:text-6xl leading-none">
                      {b.name.toUpperCase()}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {isUpcoming
                        ? "A new PowerUp experience is coming to Baner-Sus. Pre-register your interest to receive founding member updates and launch invites."
                        : b.address}
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {FEATURES.map((f) => (
                        <li
                          key={f}
                          className="rounded-full glass px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-9 flex flex-wrap gap-4">
                      {isUpcoming ? (
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
                          <PowerButton href={WHATSAPP}>Book free trial</PowerButton>
                          {b.maps && (
                            <PowerButton href={b.maps} variant="ghost">
                              Directions
                            </PowerButton>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <Atmosphere variant="c" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.82]">
              CLAIM YOUR
              <br />
              FREE <span className="text-volt">TRIAL</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
              Select your preferred club and experience the Power Up standard firsthand.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <PowerButton to="/contact">Get my free pass</PowerButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
