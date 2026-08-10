import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "../components/Atmosphere";
import { Reveal } from "../components/Reveal";
import { PowerButton } from "../components/PowerButton";
import { BRANCHES, WHATSAPP } from "../components/site";
import { EnquiryModal } from "../components/EnquiryModal";
import { MapPin } from "lucide-react";
import { ImageSlideshow } from "../components/ImageSlideshow";

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
      { property: "og:description", content: "Find the nearest ultimate fitness club in Pune." },
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
  const [modalOpen, setModalOpen] = useState(false);

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
            <p className="mt-8 max-w-md text-lg text-muted-foreground italic">
              Find the nearest ultimate fitness club in Pune.
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
              <Reveal key={b.id} delay={i * 100} variant={i % 2 === 0 ? "left" : "right"}>
                <article
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                    i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative w-full max-w-xl mx-auto">
                    <div
                      className={`overflow-hidden border border-border/40 transition-all duration-700 shadow-xl card-hover-fx ${
                        i % 2 ? "rounded-[1rem_3rem_1rem_3rem]" : "rounded-[3rem_1rem_3rem_1rem]"
                      }`}
                    >
                      <ImageSlideshow
                        images={[...b.images]}
                        alt={`Power Up Fitness ${b.name} club interior`}
                        className="h-80 w-full"
                      />
                    </div>
                    {isUpcoming && (
                      <span className="absolute left-6 top-6 rounded-full glass-strong border border-volt/60 bg-carbon-deep/60 backdrop-blur-md px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-volt shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-pulse">
                        Upcoming Club
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 p-8 sm:p-9 metal clip-notch bg-gradient-to-br from-[#181818] via-[#0d0d0d] to-[#141414] border border-border/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] card-hover-fx">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[0.62rem] uppercase tracking-[0.3em] text-volt">{b.city}</p>
                        {isUpcoming && (
                          <span className="rounded-full bg-volt/20 border border-volt/50 px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <h2 className="mt-3 font-display text-5xl sm:text-6xl leading-none group-hover:text-volt transition-colors">
                        {b.name.toUpperCase()}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex items-center gap-1.5 flex-wrap">
                        <span>
                          {isUpcoming
                            ? "Baner - Sus, Pune. Upcoming premium fitness club"
                            : b.address}
                        </span>
                        {b.maps && (
                          <a
                            href={b.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-volt hover:opacity-80 transition-opacity"
                            title="Get Directions"
                          >
                            <MapPin className="h-4 w-4 shrink-0" />
                          </a>
                        )}
                      </p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {FEATURES.map((f) => (
                          <li
                            key={f}
                            className="rounded-full glass px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/20 transition-all duration-300 hover:border-volt/40 hover:bg-volt/10 hover:text-volt hover:scale-[1.03] cursor-default"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 pt-2">
                      {isUpcoming ? (
                        <>
                          <PowerButton
                            onClick={() => setModalOpen(true)}
                            variant="volt"
                            className="cursor-pointer"
                          >
                            Register Interest
                          </PowerButton>
                          {b.maps && (
                            <PowerButton href={b.maps} variant="ghost">
                              Directions
                            </PowerButton>
                          )}
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

      {/* Enquiry Modal with direct email submission */}
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

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
