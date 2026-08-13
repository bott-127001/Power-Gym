import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Atmosphere } from "../components/Atmosphere";
import { Reveal } from "../components/Reveal";
import { PowerButton } from "../components/PowerButton";
import {
  BRANCHES,
  ENQUIRY_GOALS,
  PHONE,
  getBranchDirectWhatsAppUrl,
  type BranchId,
} from "../components/site";
import { recordEnquiryFn } from "../lib/enquiry";
import { AlertCircle, CheckCircle2, MessageCircle, Send, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Free Trial — Power Up Fitness Pune" },
      {
        name: "description",
        content:
          "Book a free trial at Power Up Fitness Bhukum or Mahalunge. Call +91 84465 88173 or send us your goal and we'll be in touch.",
      },
      { property: "og:title", content: "Contact & Free Trial — Power Up Fitness Pune" },
      {
        property: "og:description",
        content: "Schedule an appointment at your nearest Power Up club.",
      },
    ],
  }),
  component: Contact,
});

const field =
  "w-full rounded-2xl border border-input bg-carbon-deep/80 px-5 py-3.5 text-sm outline-hidden transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-volt/60 focus:ring-2 focus:ring-volt/20";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branchId, setBranchId] = useState<string>(BRANCHES[0]?.id || "bhukum");
  const [goal, setGoal] = useState<string>(ENQUIRY_GOALS[0] || "Membership & Plans");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[\s\-()+]/g, "").replace(/^91|^0/, "");
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

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
          enquiry: goal,
          message,
          source: "Contact Page",
        },
      });

      if (!res?.success) {
        throw new Error("Could not record enquiry in spreadsheet.");
      }

      setSubmissionId(res.submissionId);
      setSubmitting(false);

      // 2. Open Gmail compose window to pisal.rohan@gmail.com with details
      const branchName = BRANCHES.find((b) => b.id === branchId)?.name || branchId;
      const subject = encodeURIComponent(
        `New PowerUp Fitness Enquiry: ${name.trim()} (${branchName})`,
      );
      const emailLines = [
        "Hello PowerUp Team,",
        "",
        "A new fitness enquiry has been submitted through the PowerUp website contact form:",
        "",
        `• Name: ${name.trim()}`,
        `• Phone: +91 ${phone.trim()}`,
        `• Preferred Branch: Power Up ${branchName}`,
        `• Interested In: ${goal.trim()}`,
      ];

      if (message.trim()) {
        emailLines.push(`• Message: ${message.trim()}`);
      }

      if (res?.submissionId) {
        emailLines.push(`• Reference ID: ${res.submissionId}`);
      }

      emailLines.push("");
      emailLines.push("PowerUp Fitness Concierge System");

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=pisal.rohan@gmail.com&su=${subject}&body=${encodeURIComponent(
        emailLines.join("\n"),
      )}`;

      // Open Gmail in a new tab
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setSubmitting(false);
      setServerError(
        "We couldn't submit your enquiry right now. Please email directly to pisal.rohan@gmail.com.",
      );
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <Atmosphere variant="a" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <h1 className="font-display text-[clamp(3.6rem,12vw,9.5rem)] leading-[0.78]">
              ASK US
              <br />
              <span className="text-volt-gradient">ANYTHING</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Fill out the form below to record your enquiry and start a conversation over email
              with our fitness team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden pb-28">
        <Atmosphere variant="d" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal variant="left">
            <form onSubmit={handleSubmit} className="clay rounded-[2.5rem] p-8 sm:p-10 card-hover-fx">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-volt">
                Schedule appointment
              </p>

              {serverError && (
                <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-300 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                  <div className="flex-1">
                    <p>{serverError}</p>
                    <a
                      href="mailto:pisal.rohan@gmail.com"
                      className="mt-2 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-volt hover:underline text-[0.7rem]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email directly to pisal.rohan@gmail.com →
                    </a>
                  </div>
                </div>
              )}

              {submissionId && (
                <div className="mt-6 rounded-2xl border border-volt/40 bg-volt/10 p-4 text-xs text-foreground flex items-start gap-2.5 animate-scale-up">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-volt" />
                  <div className="flex-1">
                    <p className="font-semibold text-volt">Enquiry Recorded Successfully!</p>
                    <p className="mt-1 text-muted-foreground">
                      Reference ID:{" "}
                      <span className="font-mono text-foreground font-bold">{submissionId}</span>
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      Your prefilled email has opened in Gmail. Our coaches will assist you
                      promptly.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <div>
                  <input
                    required
                    placeholder="Your Name *"
                    value={name}
                    disabled={submitting}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name)
                        setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={field}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-400 pl-4">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit Mobile Number *"
                    value={phone}
                    disabled={submitting}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (fieldErrors.phone)
                        setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className={field}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-400 pl-4">{fieldErrors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 pl-4">
                      Nearest Branch *
                    </label>
                    <select
                      required
                      value={branchId}
                      disabled={submitting}
                      onChange={(e) => setBranchId(e.target.value)}
                      className={field}
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={b.id} className="bg-carbon text-foreground">
                          Power Up {b.name}
                          {b.status === "upcoming" ? " — Coming Soon" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 pl-4">
                      Interested In *
                    </label>
                    <select
                      required
                      value={goal}
                      disabled={submitting}
                      onChange={(e) => setGoal(e.target.value)}
                      className={field}
                    >
                      {ENQUIRY_GOALS.map((g) => (
                        <option key={g} value={g} className="bg-carbon text-foreground">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you're looking for (Optional)"
                    value={message}
                    disabled={submitting}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-2xl border border-input bg-carbon-deep/80 px-5 py-3 text-sm outline-hidden transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-volt/60 focus:ring-2 focus:ring-volt/20 resize-none"
                  />
                </div>
              </div>

               <button
                type="submit"
                disabled={submitting}
                className="group relative mt-6 w-full overflow-hidden rounded-full bg-volt px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-carbon transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_-16px_var(--volt)] disabled:opacity-75 cursor-pointer active:scale-98"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="h-4 w-4 icon-bounce" />
                    </>
                  )}
                </span>
              </button>

              <p className="mt-3 text-center text-[0.65rem] text-muted-foreground/80">
                Records your enquiry in our verified schedule and pre-fills your email.
              </p>
            </form>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={100} variant="right">
              <div className="metal clip-angled p-9 card-hover-fx">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-volt">
                  Contact details
                </p>
                <a
                  href={`tel:${PHONE}`}
                  className="mt-5 block font-display text-5xl leading-none transition-colors hover:text-volt"
                >
                  +91 84465 88173
                </a>
                <div className="mt-8 space-y-6 text-sm text-muted-foreground">
                  {BRANCHES.map((b) => (
                    <div key={b.id} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{b.name} Club</span>
                        {b.status === "upcoming" && (
                          <span className="rounded-full bg-volt/20 border border-volt/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt animate-pulse">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs">{b.address}</p>
                      {b.phone && (
                        <a
                          href={`tel:${b.phone}`}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-volt hover:underline"
                        >
                          {b.phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={180} variant="right">
              <div className="glass-strong rounded-[2.5rem] p-9 card-hover-fx">
                <p className="font-display text-3xl leading-none">START A CONVERSATION</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Membership, personal training or franchise enquiries — choose your branch:
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  {BRANCHES.map((b) => (
                    <PowerButton
                      key={b.id}
                      href={getBranchDirectWhatsAppUrl(b.id)}
                      variant={b.status === "upcoming" ? "ghost" : "volt"}
                    >
                      {b.name} {b.status === "upcoming" ? "(Enquire)" : "WhatsApp"}
                    </PowerButton>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
