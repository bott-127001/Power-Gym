import { useState, useEffect, useRef } from "react";
import { BRANCHES, ENQUIRY_GOALS, type BranchId } from "./site";
import { recordEnquiryFn } from "../lib/enquiry";
import { X, Sparkles, Mail, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [branchId, setBranchId] = useState<string>(BRANCHES[0]?.id || "bhukum");
  const [enquiry, setEnquiry] = useState<string>("");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; enquiry?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [enquiryDropdownOpen, setEnquiryDropdownOpen] = useState(false);

  const branchDropdownRef = useRef<HTMLDivElement>(null);
  const enquiryDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside listener for custom dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
      if (enquiryDropdownRef.current && !enquiryDropdownRef.current.contains(event.target as Node)) {
        setEnquiryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Form submission handler: Records in Excel & routes to samarthsalgar02@gmail.com
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting || submitted) return;

    const newErrors: { name?: string; phone?: string; enquiry?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }

    if (!phone.trim() || !validatePhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!enquiry) {
      newErrors.enquiry = "Please select one option";
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
          message: email ? `Email: ${email.trim()} | ${message}` : message,
          source: "Homepage Popup",
        },
      });

      setSubmitted(true);
      setSubmitting(false);

      // 2. Build email mailto link to samarthsalgar02@gmail.com
      const branch = BRANCHES.find((b) => b.id === branchId) || BRANCHES[0]!;
      const subject = encodeURIComponent(
        `New PowerUp Fitness Enquiry: ${name.trim()} (${branch.name})`,
      );
      const emailLines = [
        "Hello PowerUp Team,",
        "",
        "A new fitness enquiry has been submitted through the PowerUp website popup:",
        "",
        `• Name: ${name.trim()}`,
        `• Phone: +91 ${phone.trim()}`,
      ];

      if (email.trim()) {
        emailLines.push(`• Email: ${email.trim()}`);
      }

      emailLines.push(
        `• Preferred Branch: Power Up ${branch.name}${branch.status === "upcoming" ? " (Coming Soon)" : ""}`,
      );
      emailLines.push(`• Interested In: ${enquiry.trim()}`);

      if (message.trim()) {
        emailLines.push(`• Message: ${message.trim()}`);
      }

      if (res?.submissionId) {
        emailLines.push(`• Reference ID: ${res.submissionId}`);
      }

      emailLines.push("");
      emailLines.push("PowerUp Fitness Concierge System");

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=samarthsalgar02@gmail.com&su=${subject}&body=${encodeURIComponent(
        emailLines.join("\n"),
      )}`;

      // Open Gmail in a new tab
      window.open(gmailUrl, "_blank", "noopener,noreferrer");

      // 3. Gracefully close modal
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2500);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setSubmitting(false);
      setServerError(
        "We couldn't record your enquiry right now. Please email directly to samarthsalgar02@gmail.com.",
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
            {/* ───────────── HEADER ───────────── */}
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-volt">
              <Sparkles className="h-3.5 w-3.5 text-volt" />
              PowerUp Enquiry
            </div>
            <h2
              id="enquiry-modal-title"
              className="mt-3 font-display font-black text-2xl sm:text-4xl uppercase leading-[0.9] tracking-tight text-foreground"
            >
              START YOUR <br />
              <span className="text-volt-gradient">TRANSFORMATION</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
          <div className="relative mt-4 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs sm:text-sm text-red-300 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
            <div className="flex-1">
              <p>{serverError}</p>
              <a
                href="mailto:samarthsalgar02@gmail.com"
                className="mt-2 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-volt hover:underline text-xs"
              >
                <Mail className="h-3.5 w-3.5" />
                Email directly to samarthsalgar02@gmail.com →
              </a>
            </div>
          </div>
        )}

        {/* ───────────── FORM ───────────── */}
        <form onSubmit={handleSubmit} className="relative mt-4 space-y-3 sm:space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-foreground/90 mb-1.5">
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
              className={`w-full rounded-2xl border bg-carbon/80 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all placeholder:text-muted-foreground/50 focus:border-volt/70 focus:ring-2 focus:ring-volt/20 ${
                fieldErrors.name ? "border-red-500/80" : "border-border/40"
              }`}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-400 font-medium">{fieldErrors.name}</p>
            )}
          </div>

          {/* Phone & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-foreground/90 mb-1.5">
                Phone Number <span className="text-volt">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
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
                  className={`w-full rounded-2xl border bg-carbon/80 pl-13 pr-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all placeholder:text-muted-foreground/50 focus:border-volt/70 focus:ring-2 focus:ring-volt/20 ${
                    fieldErrors.phone ? "border-red-500/80" : "border-border/40"
                  }`}
                />
              </div>
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-red-400 font-medium">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-foreground/90 mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                disabled={submitting || submitted}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-border/40 bg-carbon/80 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all placeholder:text-muted-foreground/50 focus:border-volt/70 focus:ring-2 focus:ring-volt/20"
              />
            </div>
          </div>

          {/* Branch & Interest Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Preferred Branch (Custom Dropdown) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-foreground/90 mb-1.5">
                Branch <span className="text-volt">*</span>
              </label>
              <div ref={branchDropdownRef} className="relative">
                <button
                  type="button"
                  disabled={submitting || submitted}
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-2xl border border-border/40 bg-carbon/90 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground cursor-pointer transition-all focus:border-volt/70 focus:ring-2 focus:ring-volt/20 text-left"
                >
                  <span className="truncate">
                    Power Up {BRANCHES.find((b) => b.id === branchId)?.name}
                    {BRANCHES.find((b) => b.id === branchId)?.status === "upcoming" ? " — Coming Soon" : ""}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-volt transition-transform duration-300 ${branchDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {branchDropdownOpen && (
                  <div className="absolute z-100 w-full mt-1.5 rounded-2xl bg-[#0c0c0c] border border-volt/35 p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.95)] max-h-60 overflow-y-auto animate-fade-in">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setBranchId(b.id);
                          setBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
                          branchId === b.id
                            ? "bg-volt text-carbon font-bold"
                            : "text-foreground hover:bg-carbon hover:text-volt"
                        }`}
                      >
                        Power Up {b.name}
                        {b.status === "upcoming" ? " (Coming Soon)" : ""}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Interest (Custom Dropdown) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-foreground/90 mb-1.5">
                Interest <span className="text-volt">*</span>
              </label>
              <div ref={enquiryDropdownRef} className="relative">
                <button
                  type="button"
                  disabled={submitting || submitted}
                  onClick={() => setEnquiryDropdownOpen(!enquiryDropdownOpen)}
                  className={`w-full flex items-center justify-between rounded-2xl border bg-carbon/90 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground cursor-pointer transition-all focus:border-volt/70 focus:ring-2 focus:ring-volt/20 text-left ${
                    fieldErrors.enquiry ? "border-red-500/80" : "border-border/40"
                  }`}
                >
                  <span className={`truncate ${!enquiry ? "text-muted-foreground/60 font-medium" : ""}`}>
                    {enquiry || "Select one option"}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-volt transition-transform duration-300 ${enquiryDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {enquiryDropdownOpen && (
                  <div className="absolute z-100 w-full mt-1.5 rounded-2xl bg-[#0c0c0c] border border-volt/35 p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.95)] animate-fade-in">
                    {ENQUIRY_GOALS.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => {
                          setEnquiry(goal);
                          setEnquiryDropdownOpen(false);
                          if (fieldErrors.enquiry) setFieldErrors((prev) => ({ ...prev, enquiry: undefined }));
                        }}
                        className={`w-full text-left rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
                          enquiry === goal
                            ? "bg-volt text-carbon font-bold"
                            : "text-foreground hover:bg-carbon hover:text-volt"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {fieldErrors.enquiry && (
                <p className="mt-1 text-xs text-red-400 font-medium">{fieldErrors.enquiry}</p>
              )}
            </div>
          </div>

          {/* Optional Message / Goal Note */}
          <div>
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
              Goal or Question (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Looking for personal training / trial"
              value={message}
              disabled={submitting || submitted}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-border/40 bg-carbon/80 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all placeholder:text-muted-foreground/40 focus:border-volt/70 focus:ring-2 focus:ring-volt/20"
            />
          </div>

          {/* ───────────── SUBMIT CTA BUTTON ───────────── */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || submitted}
              className="group relative w-full overflow-hidden rounded-full bg-volt py-3.5 sm:py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-carbon transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,222,71,0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-carbon" />
                    <span>Submitted!</span>
                  </>
                ) : submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <span>Submit</span>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
