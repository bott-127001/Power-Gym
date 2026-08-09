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
      className="fixed bottom-4 right-4 z-50 sm:bottom-7 sm:right-7 [bottom:max(1rem,env(safe-area-inset-bottom))] [right:max(1rem,env(safe-area-inset-right))]"
    >
      {/* ───────────── POPUP BRANCH SELECTOR ───────────── */}
      {isOpen && (
        <div className="absolute bottom-14 sm:bottom-16 right-0 w-72 sm:w-80 rounded-2xl glass-strong bg-carbon-deep/95 border border-volt/40 p-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] animate-scale-up z-50">
          <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
            <div className="flex items-center gap-2">
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
                      {isUpcoming ? `${b.shortAddress} · Launching Soon` : b.shortAddress}
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
        className="group relative grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full bg-volt text-carbon shadow-[0_12px_30px_-10px_var(--volt)] sm:shadow-[0_18px_40px_-14px_var(--volt)] transition-all duration-500 animate-pulse-ring hover:scale-110 cursor-pointer z-50"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5.5 w-5.5 sm:h-7.5 sm:w-7.5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
        <span className="pointer-events-none absolute right-14 sm:right-16 whitespace-nowrap rounded-full glass-strong px-3 py-1.5 sm:px-4 sm:py-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:inline-block mr-2">
          Chat with us
        </span>
      </button>
    </div>
  );
}
