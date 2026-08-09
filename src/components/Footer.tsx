import { Link } from "@tanstack/react-router";
import { BRANCHES, NAV, PHONE } from "./site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-carbon-deep noise">
      <div className="pointer-events-none absolute -bottom-52 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-volt/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <h2 className="font-display text-6xl leading-[0.8] sm:text-7xl">
              POWER<span className="text-volt">UP</span>
              <br />
              FITNESS
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Next-level biomechanics, elite coaching, and a community built on progression. Bhukum
              · Mahalunge, Pune.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-volt">Clubs</p>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              {BRANCHES.map((b) => (
                <li key={b.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{b.name}</span>
                    {b.status === "upcoming" && (
                      <span className="rounded-full bg-volt/20 border border-volt/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5">{b.address}</p>
                </li>
              ))}
              <li>
                <a href={`tel:${PHONE}`} className="text-volt hover:underline">
                  +91 84465 88173
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-volt">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
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

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Power Up Fitness</span>
          <span>Bhukum · Mahalunge · Baner-Sus (Upcoming)</span>
        </div>
      </div>
    </footer>
  );
}
