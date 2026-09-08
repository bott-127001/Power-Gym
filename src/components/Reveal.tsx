import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

