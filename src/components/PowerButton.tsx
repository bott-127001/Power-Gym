import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-500 will-change-transform";

const styles = {
  volt: "rounded-full bg-volt text-carbon shadow-[0_18px_45px_-18px_var(--volt)] hover:-translate-y-1 hover:shadow-[0_26px_60px_-16px_var(--volt)] hover:scale-[1.02]",
  ghost:
    "rounded-full glass text-foreground hover:-translate-y-1 hover:border-volt/50 hover:text-volt",
  slab: "clip-notch metal text-foreground hover:-translate-y-1 hover:text-volt",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </>
  );
}

export function PowerButton({
  children,
  to,
  href,
  variant = "volt",
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (to)
    return (
      <Link to={to as "/"} className={cls}>
        <Inner>{children}</Inner>
      </Link>
    );
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={cls}
    >
      <Inner>{children}</Inner>
    </a>
  );
}
