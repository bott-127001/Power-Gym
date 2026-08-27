export const PHONE = "+918308888008";
export const WHATSAPP = "https://wa.me/918446588173";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/branches", label: "Clubs" },
  { to: "/franchise", label: "Franchise" },
  { to: "/contact", label: "Contact" },
] as const;

import facility from "../assets/facility.jpg";
import hero from "../assets/hero.jpg";

// ───────────── POWERUP BRANCHES (2 ACTIVE + 1 UPCOMING) ─────────────
export const BRANCHES = [
  {
    id: "bhukum",
    name: "Bhukum",
    fullName: "Bhukum Club",
    city: "Pune",
    status: "active" as const,
    phone: "+918308888008",
    whatsappNumber: "918446588173",
    occupancy: "MODERATE",
    address: "Skyi Manas, Lake City, Bhukum, Maharashtra 412115",
    shortAddress: "Skyi Manas",
    maps: "https://maps.google.com/?q=Power+Up+Fitness+Bhukum+Pune",
    image: "/Bhukum.jpg",
    images: ["/Bhukum.jpg", "/Bhukum1.jpg", "/Bhukum2.jpg", "/Bhukum3.jpg"],
  },
  {
    id: "mahalunge",
    name: "Mahalunge",
    fullName: "Mahalunge Club",
    city: "Pune",
    status: "active" as const,
    phone: "+918308888008",
    whatsappNumber: "918446588174",
    occupancy: "LOW",
    address: "21, Opp. Godrej Green Cove, near VTP Circle, Mahalunge, Pune",
    shortAddress: "Near VTP Circle",
    maps: "https://maps.google.com/?q=Power+Up+Fitness+Mahalunge+Pune",
    image: "/Mahalunge.jpg",
    images: ["/Mahalunge.jpg", "/Mahalunge1.jpg", "/Mahalunge2.jpg", "/Mahalunge3.jpg"],
  },
  {
    id: "baner-sus",
    name: "Baner-Sus",
    fullName: "Baner-Sus Club",
    city: "Pune",
    status: "upcoming" as const,
    phone: "+918308888008",
    whatsappNumber: "918446588164",
    occupancy: "COMING SOON",
    address: "Baner - Sus, Pune, Maharashtra",
    shortAddress: "Baner - Sus",
    maps: "https://maps.google.com/?q=Power+Up+Fitness+Baner+Sus+Pune",
    image: facility,
    images: [facility],
  },
] as const;

export type BranchId = (typeof BRANCHES)[number]["id"];

export const ENQUIRY_GOALS = [
  "Free Trial",
  "Membership & Plans",
  "Short Session",
  "Franchise",
] as const;

/**
 * Direct WhatsApp chat URL for a branch (No prefilled message, for floating icon)
 */
export function getBranchDirectWhatsAppUrl(branchId: string): string {
  const branch = BRANCHES.find((b) => b.id === branchId) || BRANCHES[0]!;
  if (!branch.whatsappNumber) {
    return WHATSAPP;
  }
  return `https://wa.me/${branch.whatsappNumber}`;
}

/**
 * Prefilled WhatsApp enquiry message URL (for Homepage popup & Contact page after recording)
 */
export function createBranchEnquiryWhatsAppUrl(details: {
  name: string;
  phone: string;
  branchId: string;
  enquiry: string;
  message?: string;
  submissionId?: string;
}): string {
  const branch = BRANCHES.find((b) => b.id === details.branchId) || BRANCHES[0]!;
  const branchLabel =
    branch.status === "upcoming"
      ? `Power Up ${branch.name} (Coming Soon)`
      : `Power Up ${branch.name}`;

  const targetNumber = branch.whatsappNumber || "918446588173";

  const lines = [
    "Hello PowerUp Fitness! 👋",
    "",
    "I'd like to enquire about PowerUp Fitness.",
    "",
    `• Name: ${details.name.trim()}`,
    `• Phone: ${details.phone.trim()}`,
    `• Branch / Territory: ${branchLabel}`,
    `• Interest: ${details.enquiry.trim()}`,
  ];

  if (details.message?.trim()) {
    lines.push(`• Message: ${details.message.trim()}`);
  }

  if (details.submissionId) {
    lines.push(`• Ref: ${details.submissionId}`);
  }

  lines.push("");
  lines.push("I submitted this enquiry through the PowerUp Fitness website.");

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const PROGRAMS = [
  {
    title: "Weight Training",
    copy: "Dedicated isolation machines and free weights engineered for hypertrophy.",
    tag: "01",
  },
  {
    title: "Cross Fit",
    copy: "High-intensity functional conditioning on competition-grade rigs.",
    tag: "02",
  },
  {
    title: "Yoga & Mobility",
    copy: "Flexibility, breath and core strength inside a quiet recovery studio.",
    tag: "03",
  },
  {
    title: "Dance & Zumba",
    copy: "High-energy group cardio sessions that never feel like a workout.",
    tag: "04",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Infrastructure is good, very spacious, quality equipments. The huge knowledge and experience all coaches and trainers have, they will support you in the best possible way.",
    name: "Satyam Angre",
  },
  {
    quote:
      "Very clean and well-maintained. All the equipment is modern. The trainers are professional, supportive, and very knowledgeable. They guide you properly and ensure correct form.",
    name: "Pravin Patil",
  },
  {
    quote:
      "The atmosphere is positive and motivating, which makes workouts more enjoyable. Good variety of cardio machines, weight training equipment, and a functional training area.",
    name: "Ramesh Yenpure",
  },
] as const;
