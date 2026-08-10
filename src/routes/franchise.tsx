import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Atmosphere } from "../components/Atmosphere";
import { Reveal } from "../components/Reveal";
import { PowerButton } from "../components/PowerButton";
import { FranchisePathRoadmap } from "../components/FranchisePathRoadmap";
import { InterlockingSystemCards } from "../components/InterlockingSystemCards";
import { recordEnquiryFn } from "../lib/enquiry";
import {
  TrendingUp,
  Building2,
  Users,
  ShieldCheck,
  Award,
  Zap,
  Flame,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Send,
  Sparkles,
  ArrowRight,
  Dumbbell,
  HeartPulse,
  Wallet,
  Smartphone,
  Check,
  Phone,
  MapPin,
  Globe,
  Sliders,
  DollarSign,
  ChevronRight,
  Compass,
  Calendar,
  Layers,
  FileCheck,
  Scale,
} from "lucide-react";

export const Route = createFileRoute("/franchise")({
  head: () => ({
    meta: [
      { title: "PowerUp Fitness Franchise — Investment Opportunity" },
      {
        name: "description",
        content:
          "Own a proven, community-driven gym brand in one of India's fastest-growing markets. FOCO model, 30-35% ROI, 5,000+ sq ft turnkey gym franchise in Pune.",
      },
      { property: "og:title", content: "PowerUp Fitness Franchise — Investment Opportunity" },
      {
        property: "og:description",
        content:
          "Invest in Pune's high-yield fitness brand. 30–35% ROI, FOCO operations, turnkey SOPs.",
      },
    ],
  }),
  component: Franchise,
});

// ───────────── DATA FROM 13-PAGE PDF PROSPECTUS ─────────────

const MARKET_PROJECTIONS = [
  { year: "2024", size: "₹16,200", raw: 16200, height: "42%" },
  { year: "2026", size: "₹21,425", raw: 21425, height: "56%" },
  { year: "2028", size: "₹28,334", raw: 28334, height: "74%" },
  { year: "2030", size: "₹37,700", raw: 37700, height: "98%", isPeak: true },
];

const TAILWINDS = [
  {
    icon: HeartPulse,
    title: "Health as a lifestyle",
    copy: "Post-pandemic, Indians are shifting from reactive healthcare to preventive, everyday wellness and functional vitality.",
  },
  {
    icon: Wallet,
    title: "Rising disposable income",
    copy: "Higher per-capita income is making gym memberships and personal coaching affordable for millions across urban catchments.",
  },
  {
    icon: Users,
    title: "A massive untapped base",
    copy: "Of ~956 million adults aged 18–62, only a small fraction participate in paid fitness today, leaving massive room for expansion.",
  },
  {
    icon: Smartphone,
    title: "Digital & hybrid fitness",
    copy: "Apps, biometric tracking, and hybrid operating models deepen member engagement and unlock high-margin revenue streams.",
  },
];

const LOCATIONS = [
  { num: "01", name: "Bhukum Club", status: "Active Club · Prime Catchment" },
  { num: "02", name: "Mahalunge Club", status: "Active Club · High Density Hub" },
  { num: "03", name: "Baner-Sus Club", status: "Upcoming Club · Coming Soon" },
];

const OFFERINGS = [
  "Strength Training",
  "Cardio",
  "Crossfit & Functional Training",
  "Personal Training",
  "Fitness App",
  "Group X Activities",
  "Recovery Zone",
  "Nutrition Support",
  "Healthy Cafe",
];

const SETS_US_APART = [
  {
    n: "01",
    icon: HeartPulse,
    title: "Smart Cardio & Conditioning",
    copy: "Ample equipment for every endurance level — no crowding, no waiting, optimal floor utilization.",
  },
  {
    n: "02",
    icon: Dumbbell,
    title: "Strength That Delivers",
    copy: "Free weights to biomechanically calibrated machinery, engineered for measurable athletic transformation.",
  },
  {
    n: "03",
    icon: Award,
    title: "Coaches Who Care",
    copy: "Certified trainers delivering personal attention and technical form guidance that retains members.",
  },
  {
    n: "04",
    icon: Flame,
    title: "Community-Driven Energy",
    copy: "CrossFit, Zumba & dance, member competitions, and fitness challenges that build deep brand loyalty.",
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Clean & Disciplined",
    copy: "High hygiene standards and structured operating systems, digitally monitored via the PowerUp app.",
  },
];

const REVENUE_STREAMS = [
  {
    icon: Users,
    title: "Memberships",
    copy: "Recurring monthly, quarterly & annual gym plans form the predictable cashflow core.",
  },
  {
    icon: Dumbbell,
    title: "Personal Training",
    copy: "One-on-one athletic coaching and form correction at a premium price point.",
  },
  {
    icon: Flame,
    title: "Transformation Programs",
    copy: "Time-bound fat loss, hypertrophy, and competition prep packages.",
  },
  {
    icon: Sparkles,
    title: "Group Classes",
    copy: "CrossFit, Yoga, Zumba, functional circuits, and specialty dance batches.",
  },
  {
    icon: Sliders,
    title: "Add-on Services",
    copy: "In-house nutrition bar, app subscriptions, branded athletic merchandise & café sales.",
  },
];

const SUPPORT_BEFORE = [
  "Site selection & demographic feasibility",
  "Gym 3D CAD design & layout planning",
  "Equipment procurement & fit-out pricing",
  "Staff hiring, testing & academy certification",
  "Pre-launch marketing & founder sign-ups",
];

const SUPPORT_AFTER = [
  "Digital marketing & localized lead generation",
  "Staff ongoing training & operating SOPs",
  "Membership sales playbooks & renewals",
  "Performance & daily revenue KPI monitoring",
  "Ongoing brand, marketing & tech stack updates",
];

const fieldClass =
  "w-full rounded-2xl border border-input bg-carbon-deep/80 px-5 py-3.5 text-sm outline-hidden transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-volt/60 focus:ring-2 focus:ring-volt/20";

function Franchise() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [timeline, setTimeline] = useState("Immediate (1-3 months)");
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
      const fullNote = [
        city ? `Target Location: ${city}` : "",
        timeline ? `Timeline: ${timeline}` : "",
        message ? `Notes: ${message}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await recordEnquiryFn({
        data: {
          name,
          phone,
          branchId: "bhukum",
          enquiry: "Franchise Opportunity / Partnership",
          message: fullNote,
          source: "Franchise Prospectus Page",
        },
      });

      if (!res?.success || !res?.whatsappUrl) {
        throw new Error("Could not record franchise enquiry.");
      }

      setSubmissionId(res.submissionId);
      setSubmitting(false);

      window.open(res.whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      console.error("Franchise submission error:", err);
      setSubmitting(false);
      setServerError(
        "We couldn't submit your franchise enquiry right now. Please try again or reach out on WhatsApp.",
      );
    }
  };

  return (
    <>
      {/* ───────────── 1. HERO SECTION (PDF SLIDE 01) ───────────── */}
      <section className="relative overflow-hidden pt-40 pb-24 border-b border-border/20">
        <Atmosphere variant="c" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-volt">
              Franchise Investment Opportunity
            </div>
            <h1 className="mt-6 font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.8] tracking-tight uppercase">
              OWN A PROVEN <br />
              <span className="text-volt-gradient">POWERUP GYM</span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-6 text-xl sm:text-2xl tracking-wide text-white italic font-normal">
              &ldquo;Get fitter, stronger and healthier&rdquo;
            </p>
            <p className="mt-4 max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed">
              Own a proven, community-driven gym brand in one of India&apos;s fastest-growing
              markets. Built with Franchisee-Owned, Company-Operated (FOCO) precision.
            </p>
          </Reveal>

          {/* Key Stat Cards (PDF Slide 01) */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Reveal delay={150}>
              <div className="rounded-3xl glass-strong bg-carbon-deep/80 border border-border/40 p-6 flex flex-col justify-center">
                <span className="font-display text-5xl sm:text-6xl font-black text-white leading-none">
                  3
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-volt font-display">
                  Clubs in Pune
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-3xl glass-strong bg-carbon-deep/80 border border-border/40 p-6 flex flex-col justify-center">
                <span className="font-display text-5xl sm:text-6xl font-black text-white leading-none">
                  5,000+
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-volt font-display">
                  Active Members
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="rounded-3xl glass-strong bg-carbon-deep/80 border border-border/40 p-6 flex flex-col justify-center">
                <span className="font-display text-5xl sm:text-6xl font-black text-volt leading-none">
                  15%
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-volt font-display">
                  Industry CAGR
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <PowerButton href="#enquire-franchise" variant="volt">
                Apply for Franchise
              </PowerButton>
              <PowerButton href="https://wa.me/919923899499" variant="ghost">
                Chat with Founders
              </PowerButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 2. MARKET OPPORTUNITY & 2030 PROJECTIONS (PDF SLIDE 02) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="a" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
              The Opportunity
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white">
              INDIA&apos;S FITNESS INDUSTRY IS SET TO <br />
              <span className="text-volt">MORE THAN DOUBLE BY 2030</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 items-center">
            {/* Market Growth Visual Chart (Slide 02) */}
            <Reveal delay={100}>
              <MarketGrowthChart />
            </Reveal>

            {/* 3 Metric Highlights */}
            <div className="space-y-5">
              <Reveal delay={150}>
                <div className="rounded-3xl glass-strong bg-carbon-deep/80 border border-border/40 p-6 flex items-start gap-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black text-white">₹37,700 Cr</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Projected industry market size by 2030, surging from ₹16,200 Cr in 2024.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="rounded-3xl glass-strong bg-carbon-deep/80 border border-border/40 p-6 flex items-start gap-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black text-white">23.3 Million</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Active fitness members projected by 2030 — nearly doubling 2024&apos;s 12.3M
                      base.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="rounded-3xl glass-strong bg-carbon-deep/80 border border-border/40 p-6 flex items-start gap-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black text-volt">
                      &lt; 1% Penetration
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Current fitness membership penetration in India — presenting a vast, largely
                      untapped runway.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 3. FOUR MACRO TAILWINDS (PDF SLIDE 03) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="d" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
              The Right Time To Invest
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white">
              FOUR TAILWINDS POWERING <br />
              <span className="text-volt">THE FITNESS BOOM</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {TAILWINDS.map((t, idx) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.title} delay={idx * 80}>
                  <div className="group relative rounded-[2.2rem] glass-strong bg-carbon-deep/85 border border-border/40 p-8 transition-all duration-500 hover:border-volt/60 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30 group-hover:bg-volt group-hover:text-carbon transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-2xl uppercase leading-tight text-white group-hover:text-volt transition-colors">
                        {t.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t.copy}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 4. THE PROVEN BRAND & 9 OFFERINGS (PDF SLIDE 04 & 05) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="b" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Brand & Locations */}
            <div>
              <Reveal>
                <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
                  The Brand
                </p>
                <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white">
                  A PROVEN FITNESS BRAND, <br />
                  <span className="text-volt">BUILT IN PUNE&apos;S PRIME REGION</span>
                </h2>
                <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  PowerUp Fitness has established two thriving flagship gyms in Bhukum and
                  Mahalunge, with our third club upcoming in Baner-Sus, Pune — from strength,
                  cardio and CrossFit to personal training, recovery, nutrition, and a healthy
                  café, all under expert coaching. Our mission: make results-driven fitness
                  affordable and accessible.
                </p>
              </Reveal>

              {/* 3 Footprint Locations (2 Active + 1 Upcoming) */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {LOCATIONS.map((loc) => {
                  const isUpcoming = loc.status.includes("Upcoming");

                  return (
                    <div
                      key={loc.num}
                      className={`rounded-2xl p-5 transition-all duration-300 ${
                        isUpcoming
                          ? "glass-strong border border-volt/50 bg-volt/5"
                          : "glass border border-border/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-volt font-bold">{loc.num}</span>
                        {isUpcoming && (
                          <span className="rounded-full bg-volt/20 border border-volt/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-volt">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <h4 className="mt-2 font-display text-lg font-bold text-white">{loc.name}</h4>
                      <p className="mt-1 text-[0.65rem] text-muted-foreground">{loc.status}</p>
                    </div>
                  );
                })}
              </div>

              {/* Community Asset Callout (Slide 05) */}
              <div className="mt-8 rounded-3xl glass-strong bg-volt/10 border border-volt/30 p-6">
                <p className="text-xs italic text-foreground leading-relaxed">
                  &ldquo;A loyal, engaged member base is the single biggest asset in the gym
                  business — it drives predictable recurring revenue and low acquisition cost for
                  every new unit.&rdquo;
                </p>
              </div>
            </div>

            {/* Right: 9 Offerings Full Stack */}
            <div className="rounded-[2.5rem] glass-strong bg-carbon-deep/90 border border-border/40 p-8 sm:p-10">
              <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt font-display">
                What Every PowerUp Gym Includes
              </p>
              <h3 className="mt-2 font-display text-3xl text-white">FULL-SERVICE STACK</h3>

              <div className="mt-8 flex flex-col gap-3">
                {OFFERINGS.map((off) => (
                  <div
                    key={off}
                    className="flex items-center gap-3.5 rounded-2xl bg-black/40 border border-border/30 px-5 py-3.5 text-base sm:text-lg text-[18px] font-semibold text-neutral-200 transition-colors hover:border-volt/50 hover:text-white"
                  >
                    <CheckCircle2 className="h-5 w-5 text-volt shrink-0" />
                    <span>{off}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 5. WHAT SETS US APART (PDF SLIDE 06) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="c" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
              What Sets Us Apart
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white">
              WHAT MAKES <span className="text-volt">POWERUP, POWERUP</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Five things members feel the moment they walk in — and the reason they stay.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SETS_US_APART.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.n} delay={idx * 60}>
                  <div className="group relative flex h-full flex-col justify-between rounded-[2rem] glass-strong bg-carbon-deep/85 border border-border/40 p-6 transition-all duration-500 hover:border-volt/60 hover:-translate-y-1.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-4xl font-black text-muted-foreground/30 group-hover:text-volt/60 transition-colors">
                          {item.n}
                        </span>
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-volt/15 text-volt">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight text-white group-hover:text-volt transition-colors min-h-[3.25rem] flex items-start">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 6. WHY PARTNER & 5 REVENUE STREAMS (PDF SLIDE 07 & 08) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="a" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
              The Business Model
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white">
              BUILT FOR HIGH UTILISATION & <br />
              <span className="text-volt">HIGH RETENTION</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
              Multiple revenue streams keep the cash flow steady — memberships form the recurring
              base, while services and specialty programs lift the average revenue per member.
            </p>
          </Reveal>

          {/* 4 Connected Interlocking Cards (Slide 07) */}
          <InterlockingSystemCards />

          {/* 5 Revenue Streams Cards (Slide 08) */}
          <div className="mt-16 pt-12 border-t border-border/20">
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white mb-8">
              5 DIVERSIFIED <span className="text-volt">REVENUE STREAMS</span>
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {REVENUE_STREAMS.map((rs, idx) => {
                const Icon = rs.icon;
                return (
                  <div
                    key={rs.title}
                    className="rounded-2xl glass bg-black/40 border border-border/30 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <Icon className="h-6 w-6 text-volt mb-4" />
                      <h4 className="font-display text-lg font-bold text-white uppercase min-h-[2.75rem] flex items-start">
                        {rs.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {rs.copy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 7. REQUIREMENTS & WHAT'S INCLUDED (PDF SLIDE 10) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="d" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
              WHAT IT TAKES
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white uppercase">
              REQUIREMENTS & <span className="text-volt">WHAT&apos;S INCLUDED</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Clear infrastructure prerequisites paired with our comprehensive, turnkey facility
              stack.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Left Card: The Site & Investment */}
            <Reveal delay={100}>
              <div className="h-full rounded-[2.5rem] glass-strong bg-carbon-deep/90 border border-border/40 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-volt/15 border border-volt/30 px-3.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-volt mb-8">
                    The Site & Investment
                  </div>

                  <div className="space-y-6">
                    {/* Carpet area */}
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Carpet area
                        </p>
                        <h4 className="font-display text-2xl sm:text-3xl font-black text-white mt-0.5">
                          5,000 sq ft{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            (minimum)
                          </span>
                        </h4>
                      </div>
                    </div>

                    {/* Total investment */}
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Total investment
                        </p>
                        <h4 className="font-display text-2xl sm:text-3xl font-black text-volt mt-0.5">
                          ₹1.5 – 2 Cr
                        </h4>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Location
                        </p>
                        <h4 className="font-display text-2xl sm:text-3xl font-black text-white mt-0.5">
                          Tier-1 & Tier-2 cities, prime catchments
                        </h4>
                      </div>
                    </div>

                    {/* Property */}
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt/15 text-volt border border-volt/30">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Property
                        </p>
                        <h4 className="font-display text-2xl sm:text-3xl font-black text-white mt-0.5">
                          Owned or long-lease commercial space
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Card: Every PowerUp Gym Includes */}
            <Reveal delay={200}>
              <div className="h-full rounded-[2.5rem] glass-strong bg-carbon-deep/95 border-2 border-volt/40 p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(255,222,71,0.15)] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-carbon mb-8">
                    Every PowerUp Gym Includes
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {OFFERINGS.map((offering) => (
                      <div
                        key={offering}
                        className="flex items-center gap-3 rounded-2xl bg-black/50 border border-border/40 px-4 py-3.5 text-xs sm:text-sm font-semibold text-neutral-200 transition-colors hover:border-volt/50"
                      >
                        <Check className="h-4 w-4 text-volt shrink-0" />
                        <span>{offering}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono text-volt uppercase tracking-wider">
                    Full Turnkey Fitout
                  </span>
                  <span>Direct OEM Procurement</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 8. END-TO-END SUPPORT (PDF SLIDE 11) ───────────── */}
      <section className="relative overflow-hidden py-28 border-b border-border/20">
        <Atmosphere variant="b" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
              You&apos;re Not Alone
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.85] text-white">
              END-TO-END SUPPORT, <br />
              <span className="text-volt">BEFORE AND AFTER YOU OPEN</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              No prior fitness-industry experience needed — PowerUp&apos;s team and SOPs carry you
              from signing to a full house.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {/* Before Launch */}
            <div className="rounded-[2.5rem] glass-strong bg-carbon-deep/90 border border-border/40 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-volt/20 text-volt border border-volt/40 px-4 py-1 text-xs font-bold uppercase tracking-wider mb-6">
                Before Launch
              </div>
              <div className="space-y-4">
                {SUPPORT_BEFORE.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check className="h-5 w-5 text-volt shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After Launch */}
            <div className="rounded-[2.5rem] glass-strong bg-carbon-deep/90 border border-border/40 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-1 text-xs font-bold uppercase tracking-wider text-carbon mb-6">
                After Launch
              </div>
              <div className="space-y-4">
                {SUPPORT_AFTER.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check className="h-5 w-5 text-volt shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 9. HOW IT WORKS / ROADMAP (PDF SLIDE 12) ───────────── */}
      <FranchisePathRoadmap />

      {/* ───────────── 10. FRANCHISE ENQUIRY APPLICATION & CLOSING (PDF SLIDE 13) ───────────── */}
      <section id="enquire-franchise" className="relative overflow-hidden py-28">
        <Atmosphere variant="b" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="clay rounded-[2.5rem] p-8 sm:p-10">
              <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
                Franchise Application
              </p>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-none text-foreground">
                PARTNER WITH <span className="text-volt">US</span>
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
                Submit your details below to receive the complete PowerUp franchise prospectus and
                schedule a direct meeting with the founders.
              </p>

              {serverError && (
                <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-300 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                  <div className="flex-1">
                    <p>{serverError}</p>
                    <a
                      href="https://wa.me/919923899499"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-volt hover:underline text-[0.7rem]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Connect directly on WhatsApp →
                    </a>
                  </div>
                </div>
              )}

              {submissionId && (
                <div className="mt-6 rounded-2xl border border-volt/40 bg-volt/10 p-4 text-xs text-foreground flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-volt" />
                  <div className="flex-1">
                    <p className="font-semibold text-volt">Franchise Application Recorded!</p>
                    <p className="mt-1 text-muted-foreground">
                      Reference ID:{" "}
                      <span className="font-mono text-foreground font-bold">{submissionId}</span>
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      WhatsApp has been launched with your enquiry details. We look forward to
                      partnering.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <div>
                  <input
                    required
                    placeholder="Full Name *"
                    value={name}
                    disabled={submitting}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name)
                        setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={fieldClass}
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
                    className={fieldClass}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-400 pl-4">{fieldErrors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 pl-4">
                      Target City / Area
                    </label>
                    <input
                      placeholder="e.g. Baner, Pune / Mumbai"
                      value={city}
                      disabled={submitting}
                      onChange={(e) => setCity(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 pl-4">
                      Launch Timeline
                    </label>
                    <select
                      value={timeline}
                      disabled={submitting}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={fieldClass}
                    >
                      <option value="Immediate (1-3 months)" className="bg-carbon text-foreground">
                        Immediate (1-3 months)
                      </option>
                      <option value="3-6 months" className="bg-carbon text-foreground">
                        3-6 months
                      </option>
                      <option value="6-12 months" className="bg-carbon text-foreground">
                        6-12 months
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Brief background or commercial property details (Optional)"
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
                className="group relative mt-6 w-full overflow-hidden rounded-full bg-volt px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-carbon transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_-16px_var(--volt)] disabled:opacity-75 cursor-pointer"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">
                  {submitting ? (
                    <span>Saving & Opening WhatsApp...</span>
                  ) : (
                    <>
                      <span>Apply as Franchise Partner</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </span>
              </button>

              <p className="mt-3 text-center text-[0.65rem] text-muted-foreground/80">
                Records your enquiry in our verified spreadsheet and connects you directly with our
                leadership team on WhatsApp.
              </p>
            </form>
          </Reveal>

          {/* Right: Closing Pitch & Direct Contact (Slide 13) */}
          <div className="space-y-6">
            <Reveal delay={100}>
              <div className="metal clip-angled p-9">
                <p className="text-lg sm:text-xl text-[20px] font-bold uppercase tracking-[0.2em] text-volt">
                  Let&apos;s Build It Together
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight text-white">
                  INVEST IN A PROVEN BRAND AT THE PERFECT TIME.
                </h3>
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  PowerUp Fitness offers a rare combination — an established, community-driven
                  brand, proven SOPs, diversified revenue, and full company-operated support —
                  inside a market growing at ~15% a year.
                </p>

                <div className="mt-8 space-y-4 pt-6 border-t border-border/30 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-volt" />
                    <a
                      href="tel:+919923899499"
                      className="font-bold text-white hover:text-volt transition-colors"
                    >
                      +91 99238 99499
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-volt" />
                    <span className="text-muted-foreground">www.powerupfitness.co.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-volt" />
                    <span className="text-muted-foreground">Pune, Maharashtra 412115</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="glass-strong rounded-[2.5rem] p-9">
                <p className="font-display text-3xl leading-none text-white">DIRECT FOUNDER CHAT</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Prefer instant messaging? Connect with our expansion team on WhatsApp.
                </p>
                <div className="mt-6">
                  <PowerButton href="https://wa.me/919923899499" variant="volt">
                    Chat on WhatsApp
                  </PowerButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function MarketGrowthChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={chartRef}
      className="rounded-[2.5rem] glass-strong bg-carbon-deep/90 border border-border/40 p-7 sm:p-10 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-volt">
          Fitness Market Size in ₹ Crore • ~15% CAGR
        </p>
        <span className="rounded-full bg-volt/20 border border-volt/40 px-2.5 py-0.5 text-[0.58rem] font-mono font-bold text-volt uppercase tracking-wider">
          2024–2030
        </span>
      </div>

      {/* Bar Chart Container with increased height */}
      <div className="mt-8 flex items-end justify-between gap-3 sm:gap-6 h-72 sm:h-88 pt-10 border-b border-border/40 pb-0">
        {MARKET_PROJECTIONS.map((p, idx) => (
          <MarketBar key={p.year} projection={p} active={inView} index={idx} />
        ))}
      </div>

      <p className="mt-6 text-[0.65rem] text-muted-foreground/70 text-right">
        Source: India Fitness Market Report 2025, Deloitte India & Health and Fitness Association
        (HFA).
      </p>
    </div>
  );
}

function MarketBar({
  projection,
  active,
  index,
}: {
  projection: (typeof MARKET_PROJECTIONS)[number];
  active: boolean;
  index: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const end = projection.raw;
    const duration = 1500 + index * 150;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(frame);
    }, index * 120);

    return () => clearTimeout(timer);
  }, [active, index, projection.raw]);

  const formattedCount =
    count === 0 ? "₹0" : `₹${count.toLocaleString("en-IN")}`;

  return (
    <div className="flex-1 flex flex-col items-center h-full justify-end group">
      {/* Number Value Label on top of bar */}
      <span
        className={`text-[0.68rem] sm:text-sm font-mono font-bold mb-2.5 transition-all duration-700 whitespace-nowrap ${
          projection.isPeak
            ? "text-volt font-black scale-105"
            : "text-neutral-300"
        } ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        {active ? formattedCount : "₹0"}
      </span>

      {/* Bar Column with rising animation */}
      <div className="w-full h-full flex items-end">
        <div
          style={{
            height: active ? projection.height : "0%",
            transitionDuration: `${1300 + index * 150}ms`,
            transitionDelay: `${index * 120}ms`,
          }}
          className={`w-full rounded-t-xl sm:rounded-t-2xl transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            projection.isPeak
              ? "bg-volt shadow-md border-t-2 border-white/50"
              : "bg-linear-to-t from-white/25 via-white/75 to-white opacity-90 group-hover:opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          }`}
        />
      </div>

      {/* Year Label below bar */}
      <span
        className={`mt-3 text-xs sm:text-sm font-bold font-mono transition-colors ${
          projection.isPeak ? "text-volt font-black" : "text-muted-foreground"
        }`}
      >
        {projection.year}
      </span>
    </div>
  );
}
