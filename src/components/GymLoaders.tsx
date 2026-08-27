import { useEffect, useState } from "react";

// Custom animated Barbell Loader for full screen transitions
export function BarbellLoader({ 
  message = "WARMING UP...", 
  subMessage = "PREPARING ELITE BIOMECHANICS..." 
}: { 
  message?: string;
  subMessage?: string;
}) {
  const [dots, setDots] = useState("");

  // Simple dot animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-carbon-deep/95 backdrop-blur-xl">
      {/* Cinematic Glowing Background Aura */}
      <div className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-volt/5 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute h-[25rem] w-[25rem] rounded-full bg-olive-deep/40 blur-[140px]" />

      <div className="relative flex flex-col items-center max-w-sm text-center px-4">
        {/* ───────────── ANIMATED BARBELL CONTAINER ───────────── */}
        <div className="relative h-28 w-60 flex flex-col items-center justify-center">
          
          {/* Animated Barbell */}
          <div className="animate-barbell-lift">
            <svg
              viewBox="0 0 120 40"
              className="w-48 h-16 text-volt drop-shadow-[0_8px_24px_rgba(255,222,71,0.35)]"
              fill="currentColor"
            >
              {/* Central Bar */}
              <rect x="20" y="18" width="80" height="4" rx="2" fill="url(#metalBarGrad)" />
              <rect x="20" y="19" width="80" height="1" fill="#ffffff" opacity="0.3" />

              {/* Inner Knurling Ring / Collar */}
              <rect x="32" y="15" width="2" height="10" rx="0.5" fill="#a3a3a3" />
              <rect x="86" y="15" width="2" height="10" rx="0.5" fill="#a3a3a3" />

              {/* Left Plates */}
              {/* Collar Lock */}
              <rect x="28" y="14" width="3" height="12" rx="1" fill="#ffde47" />
              {/* Plate 1 (Small) */}
              <rect x="23" y="11" width="4" height="18" rx="1.5" fill="#ffde47" />
              {/* Plate 2 (Medium) */}
              <rect x="17" y="7" width="5" height="26" rx="2" fill="#d4af37" />
              {/* Plate 3 (Large) */}
              <rect x="9" y="3" width="7" height="34" rx="3" fill="#1e1e1e" stroke="#ffde47" strokeWidth="1" />

              {/* Right Plates */}
              {/* Collar Lock */}
              <rect x="89" y="14" width="3" height="12" rx="1" fill="#ffde47" />
              {/* Plate 1 (Small) */}
              <rect x="93" y="11" width="4" height="18" rx="1.5" fill="#ffde47" />
              {/* Plate 2 (Medium) */}
              <rect x="98" y="7" width="5" height="26" rx="2" fill="#d4af37" />
              {/* Plate 3 (Large) */}
              <rect x="104" y="3" width="7" height="34" rx="3" fill="#1e1e1e" stroke="#ffde47" strokeWidth="1" />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="metalBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#737373" />
                  <stop offset="30%" stopColor="#e5e5e5" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#e5e5e5" />
                  <stop offset="100%" stopColor="#737373" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Dynamic Floor Shadow */}
          <div className="absolute bottom-4 h-2 w-32 rounded-full bg-black/60 blur-xs animate-barbell-shadow" />
        </div>

        {/* ───────────── LOADING LABELS ───────────── */}
        <h3 className="mt-6 font-display text-lg sm:text-xl font-black tracking-[0.25em] text-volt drop-shadow-[0_2px_10px_rgba(255,222,71,0.2)]">
          {message}{dots}
        </h3>
        <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {subMessage}
        </p>
      </div>
    </div>
  );
}

// Compact Spinning Dumbbell for buttons and form states
export function DumbbellSpinner({ 
  className = "h-5 w-5 text-carbon", 
  variant = "volt" 
}: { 
  className?: string;
  variant?: "volt" | "carbon" | "white";
}) {
  const colorMap = {
    volt: "text-volt",
    carbon: "text-carbon",
    white: "text-white"
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${colorMap[variant]} ${className}`}
    >
      {/* Main Shaft */}
      <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" />
      
      {/* Knurl details */}
      <line x1="9" y1="12" x2="12" y2="9" opacity="0.4" />
      <line x1="12" y1="15" x2="15" y2="12" opacity="0.4" />

      {/* Left Weights */}
      <path d="m2 9 7-7" />
      <path d="m3 10 7-7" />
      <path d="m5 13-4-4" />
      <path d="m6 14-4-4" />

      {/* Right Weights */}
      <path d="m15 22 7-7" />
      <path d="m14 21 7-7" />
      <path d="m18 10 4 4" />
      <path d="m19 11 4 4" />
    </svg>
  );
}
