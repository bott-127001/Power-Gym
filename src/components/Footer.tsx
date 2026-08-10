import { Link } from "@tanstack/react-router";
import { BRANCHES, NAV, PHONE } from "./site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-carbon-deep noise">
      <div className="pointer-events-none absolute -bottom-52 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-volt/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1.1fr_0.9fr]">
          <div className="min-w-0">
            <Link to="/" className="inline-block group mb-5">
              <img
                src="/logo.jpeg"
                alt="Power Up Fitness"
                className="h-16 sm:h-20 w-auto rounded-2xl object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-1 max-w-sm text-base leading-relaxed text-muted-foreground">
              Next-level biomechanics, elite coaching, and a community built on progression. Bhukum
              · Mahalunge, Pune.
            </p>
          </div>

          <div>
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.24em] text-volt">Clubs</p>
            <ul className="mt-6 space-y-5 text-base text-muted-foreground">
              {BRANCHES.map((b) => (
                <li key={b.id}>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-foreground text-base sm:text-lg">{b.name}</span>
                    {b.status === "upcoming" && (
                      <span className="rounded-full bg-volt/20 border border-volt/50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-volt">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm sm:text-base leading-relaxed">{b.address}</p>
                  {b.phone && (
                    <a
                      href={`tel:${b.phone}`}
                      className="mt-1.5 block font-mono text-sm sm:text-base text-volt hover:underline"
                    >
                      {b.phone}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.24em] text-volt">Explore</p>
            <ul className="mt-6 space-y-3.5 text-base sm:text-lg text-muted-foreground font-medium">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="transition-colors hover:text-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
