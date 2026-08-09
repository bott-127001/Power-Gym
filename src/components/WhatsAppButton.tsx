import { useState, useRef, useEffect } from "react";
import { BRANCHES, getBranchDirectWhatsAppUrl } from "./site";
import { X, ArrowRight, MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup on click outside or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectBranch = (branchId: string) => {
    const url = getBranchDirectWhatsAppUrl(branchId);
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div
      ref={popupRef}
      className="fixed bottom-4 left-4 z-50 sm:bottom-7 sm:left-7 [bottom:max(1rem,env(safe-area-inset-bottom))] [left:max(1rem,env(safe-area-inset-left))]"
    >
      {/* ───────────── POPUP BRANCH SELECTOR ───────────── */}
      {isOpen && (
        <div className="absolute bottom-14 sm:bottom-16 left-0 w-72 sm:w-80 rounded-2xl glass-strong bg-carbon-deep/95 border border-volt/40 p-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] animate-scale-up z-50">
          <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-volt animate-pulse" />
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-volt">
                Connect on WhatsApp
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close branch selector"
              className="grid h-6 w-6 place-items-center rounded-full glass text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Select your nearest club to start a direct chat with our team:
          </p>

          {/* PowerUp Branches (2 Active + 1 Upcoming) */}
          <div className="mt-3 space-y-2">
            {BRANCHES.map((b) => {
              const isUpcoming = b.status === "upcoming";

              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectBranch(b.id)}
                  className={`group flex w-full items-center justify-between rounded-xl p-3 text-left transition-all duration-200 cursor-pointer ${
                    isUpcoming
                      ? "bg-carbon/70 border border-volt/30 hover:border-volt/60 hover:bg-volt/10"
                      : "bg-carbon/90 hover:bg-volt/15 border border-border/40 hover:border-volt/60"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-base uppercase leading-tight text-foreground group-hover:text-volt transition-colors">
                        Power Up <span className="text-volt">{b.name}</span>
                      </p>
                      {isUpcoming && (
                        <span className="rounded-full bg-volt/20 border border-volt/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-[0.65rem] text-muted-foreground truncate max-w-[200px] mt-0.5">
                      {isUpcoming ? "Baner - Sus, Pune · Launching Soon" : b.address.split(",")[0]}
                    </p>
                  </div>
                  <div className="grid h-7 w-7 place-items-center rounded-full glass group-hover:bg-volt group-hover:text-carbon transition-colors shrink-0">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────── FLOATING WHATSAPP TRIGGER ───────────── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Power Up Fitness on WhatsApp"
        aria-expanded={isOpen}
        className="group relative grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full bg-volt text-carbon shadow-[0_12px_30px_-10px_var(--volt)] sm:shadow-[0_18px_40px_-14px_var(--volt)] transition-all duration-500 animate-pulse-ring hover:scale-110 cursor-pointer"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <MessageCircle className="h-5 w-5 sm:h-7 sm:w-7 fill-current" />
        )}
        <span className="pointer-events-none absolute left-14 sm:left-16 whitespace-nowrap rounded-full glass-strong px-3 py-1.5 sm:px-4 sm:py-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:inline-block">
          Chat with us
        </span>
      </button>
    </div>
  );
}
