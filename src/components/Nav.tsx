import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV } from "./site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const handleOpenEnquiry = () => {
    window.dispatchEvent(new CustomEvent("open-enquiry-modal"));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 [padding-top:max(0.75rem,env(safe-area-inset-top))]">
      <nav
        className={`mx-auto flex max-w-6xl items-center gap-3 sm:gap-4 rounded-full px-3.5 py-2 sm:px-5 sm:py-3 transition-all duration-500 ${
          scrolled
            ? "glass-strong bg-carbon-deep/75 shadow-[0_20px_50px_-30px_black]"
            : "border border-transparent"
        }`}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-7 w-7 sm:h-9 sm:w-9 shrink-0 place-items-center clip-hex bg-volt text-carbon font-display text-sm sm:text-lg leading-none pt-0.5 sm:pt-1 font-bold">
            P
          </span>
          <span className="font-display text-base sm:text-xl leading-none tracking-wide font-black">
            POWER<span className="text-volt">UP</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active ? "text-volt" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-volt transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleOpenEnquiry}
            className="ml-2 rounded-full bg-volt px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-carbon transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-12px_var(--volt)] cursor-pointer"
          >
            Free Trial
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="ml-auto grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full glass md:hidden transition-transform active:scale-95 cursor-pointer"
        >
          <span className="relative block h-3 w-3.5 sm:w-4">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl glass-strong bg-carbon-deep/90 p-2.5 sm:p-3 md:hidden border border-border/30 shadow-2xl">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-glass hover:text-volt"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleOpenEnquiry();
              }}
              className="w-full rounded-xl bg-volt px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-carbon cursor-pointer"
            >
              Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
