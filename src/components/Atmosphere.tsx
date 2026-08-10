/** Layered ambient lighting / fog / texture backdrop. */
export function Atmosphere({ variant = "a" }: { variant?: "a" | "b" | "c" | "d" }) {
  const layers = {
    a: (
      <>
        <div className="absolute -top-40 left-1/4 h-[42rem] w-[42rem] rounded-full bg-volt/12 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-0 -left-32 h-[34rem] w-[34rem] rounded-full bg-olive/35 blur-[130px] animate-float" />
      </>
    ),
    b: (
      <>
        <div className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-olive-deep/60 blur-[150px] animate-float" />
        <div className="absolute -top-24 left-0 h-[26rem] w-[60%] bg-volt/8 blur-[120px] animate-pulse-glow" />
      </>
    ),
    c: (
      <>
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-volt/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/25 blur-[160px] animate-float" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-volt/10 blur-[90px] animate-pulse-glow" />
      </>
    ),
    d: (
      <>
        <div className="absolute -bottom-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-volt/10 blur-[150px] animate-pulse-glow" />
        <div className="absolute top-0 left-0 h-[30rem] w-[30rem] rounded-full bg-olive-deep/70 blur-[140px] animate-float" />
      </>
    ),
  }[variant];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden noise">
      <div className="absolute inset-0 bg-linear-to-b from-carbon-deep via-carbon to-carbon-deep" />
      <div className="absolute inset-0 grid-lines opacity-60" />
      {layers}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--carbon-deep)_100%)]" />
    </div>
  );
}
