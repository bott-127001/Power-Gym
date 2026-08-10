import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform active:scale-95 cursor-pointer";

const styles = {
  volt: "rounded-full bg-volt text-carbon shadow-[0_18px_45px_-18px_var(--volt)] hover:-translate-y-1 hover:shadow-[0_26px_60px_-16px_var(--volt)] hover:scale-[1.02]",
  ghost:
    "rounded-full glass text-foreground hover:-translate-y-1 hover:border-volt/50 hover:text-volt hover:shadow-[0_10px_30px_rgba(255,222,71,0.15)]",
  slab: "clip-notch metal text-foreground hover:-translate-y-1 hover:text-volt hover:border-volt/50",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
}

export function PowerButton({
  children,
  to,
  href,
  onClick,
  variant = "volt",
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (to)
    return (
      <Link to={to as "/"} onClick={onClick} className={cls}>
        <Inner>{children}</Inner>
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        onClick={onClick}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={cls}
      >
        <Inner>{children}</Inner>
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      <Inner>{children}</Inner>
    </button>
  );
}
