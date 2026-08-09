import { useState, useEffect, useRef } from "react";
import { BRANCHES, ENQUIRY_GOALS, getBranchDirectWhatsAppUrl, type BranchId } from "./site";
import { recordEnquiryFn } from "../lib/enquiry";
import { X, Sparkles, Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branchId, setBranchId] = useState<string>(BRANCHES[0]?.id || "bhukum");
  const [enquiry, setEnquiry] = useState<string>(ENQUIRY_GOALS[0] || "Membership & Plans");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validate Indian Phone Number format
  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[\s\-()+]/g, "").replace(/^91|^0/, "");
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  // Keyboard navigation & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element for focus restoration
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Lock body scroll smoothly
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus first input after animation
    const timer = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector<HTMLInputElement>("input");
      firstInput?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  // Form submission handler with Excel recording and WhatsApp redirection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting || submitted) return;

    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }

    if (!phone.trim() || !validatePhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});
    setServerError(null);
    setSubmitting(true);

    try {
      // 1. Record enquiry in Excel spreadsheet on server
      const res = await recordEnquiryFn({
        data: {
          name,
          phone,
          branchId,
          enquiry,
          message,
          source: "Homepage Popup",
        },
      });

      if (!res?.success || !res?.whatsappUrl) {
        throw new Error("Could not record enquiry in spreadsheet.");
      }

      setSubmitted(true);
      setSubmitting(false);

      // 2. Open WhatsApp with prefilled enquiry details
      window.open(res.whatsappUrl, "_blank", "noopener,noreferrer");

      // 3. Gracefully close modal
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 1800);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setSubmitting(false);
      setServerError(
        "We couldn't submit your enquiry right now. Please try again or connect directly on WhatsApp.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* ───────────── CINEMATIC BACKDROP ───────────── */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-carbon-deep/75 backdrop-blur-md transition-opacity duration-400 animate-fade-in"
        aria-hidden="true"
      />

      {/* ───────────── GLASS MODAL CONTAINER ───────────── */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] my-auto overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] glass-strong bg-carbon-deep/95 border border-volt/35 p-6 sm:p-8 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] transition-all duration-400 animate-scale-up [max-height:min(94dvh,720px)] flex flex-col justify-between"
      >
        {/* Top Decorative Ambient Highlights */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-volt/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-volt/10 blur-3xl" />

        {/* ───────────── HEADER ───────────── */}
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-volt">
              <Sparkles className="h-3 w-3 text-volt" />
              PowerUp Enquiry
            </div>
            <h2
              id="enquiry-modal-title"
              className="mt-3 font-display font-black text-2xl sm:text-4xl uppercase leading-[0.9] tracking-tight text-foreground"
            >
              START YOUR <br />
              <span className="text-volt-gradient">TRANSFORMATION</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tell us what you&apos;re looking for and our team will help you choose the right
              PowerUp experience.
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry popup"
            className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full glass text-muted-foreground hover:text-foreground hover:border-volt/40 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Server error alert */}
        {serverError && (
          <div className="relative mt-4 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
            <div className="flex-1">
              <p>{serverError}</p>
              <a
                href={getBranchDirectWhatsAppUrl(branchId)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-volt hover:underline text-[0.68rem]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat with Branch directly on WhatsApp →
              </a>
            </div>
          </div>
        )}

        {/* ───────────── FORM ───────────── */}
        <form onSubmit={handleSubmit} className="relative mt-4 space-y-3 sm:space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-foreground/80 mb-1">
              Your Name <span className="text-volt">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              disabled={submitting || submitted}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`w-full rounded-2xl border bg-carbon/80 px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-volt/70 focus:ring-2 focus:ring-volt/20 ${
                fieldErrors.name ? "border-red-500/80" : "border-border/40"
              }`}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-[0.65rem] text-red-400 font-medium">{fieldErrors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-foreground/80 mb-1">
              Phone Number <span className="text-volt">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={14}
                placeholder="98765 43210"
                value={phone}
                disabled={submitting || submitted}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={`w-full rounded-2xl border bg-carbon/80 pl-12 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-volt/70 focus:ring-2 focus:ring-volt/20 ${
                  fieldErrors.phone ? "border-red-500/80" : "border-border/40"
                }`}
              />
            </div>
            {fieldErrors.phone && (
              <p className="mt-1 text-[0.65rem] text-red-400 font-medium">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Branch & Interest Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Preferred Branch */}
            <div>
              <label className="block text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-foreground/80 mb-1">
                Branch <span className="text-volt">*</span>
              </label>
              <select
                value={branchId}
                disabled={submitting || submitted}
                onChange={(e) => setBranchId(e.target.value)}
                className="w-full rounded-2xl border border-border/40 bg-carbon px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all focus:border-volt/70 focus:ring-2 focus:ring-volt/20 text-foreground cursor-pointer"
              >
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id} className="bg-carbon text-foreground">
                    Power Up {b.name}
                    {b.status === "upcoming" ? " — Coming Soon" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Interest */}
            <div>
              <label className="block text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-foreground/80 mb-1">
                Interest <span className="text-volt">*</span>
              </label>
              <select
                value={enquiry}
                disabled={submitting || submitted}
                onChange={(e) => setEnquiry(e.target.value)}
                className="w-full rounded-2xl border border-border/40 bg-carbon px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition-all focus:border-volt/70 focus:ring-2 focus:ring-volt/20 text-foreground cursor-pointer"
              >
                {ENQUIRY_GOALS.map((goal) => (
                  <option key={goal} value={goal} className="bg-carbon text-foreground">
                    {goal}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Message / Goal Note */}
          <div>
            <label className="block text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Goal or Question (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Looking for personal training / trial"
              value={message}
              disabled={submitting || submitted}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-border/40 bg-carbon/80 px-4 py-2 sm:py-2.5 text-xs outline-none transition-all placeholder:text-muted-foreground/40 focus:border-volt/70 focus:ring-2 focus:ring-volt/20"
            />
          </div>

          {/* ───────────── SUBMIT CTA BUTTON ───────────── */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || submitted}
              className="group relative w-full overflow-hidden rounded-full bg-volt py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-carbon transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,222,71,0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-carbon" />
                    <span>Enquiry Saved! Opening WhatsApp...</span>
                  </>
                ) : submitting ? (
                  <span>Saving & Opening WhatsApp...</span>
                ) : (
                  <>
                    <span>Continue to WhatsApp</span>
                    <Send className="h-3.5 w-3.5 text-carbon" />
                  </>
                )}
              </span>
            </button>

            <p className="mt-2 text-center text-[0.6rem] sm:text-[0.65rem] text-muted-foreground/75">
              Records your enquiry in our verified schedule and pre-fills your WhatsApp chat.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
