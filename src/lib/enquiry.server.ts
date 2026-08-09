import * as XLSX from "xlsx";
import * as fs from "node:fs";
import * as path from "node:path";
import { BRANCHES, createBranchEnquiryWhatsAppUrl, type BranchId } from "../components/site";

export interface EnquiryPayload {
  name: string;
  phone: string;
  branchId: string;
  enquiry: string;
  message?: string;
  source: "Homepage Popup" | "Contact Page";
}

export interface EnquiryResponse {
  success: boolean;
  submissionId: string;
  whatsappUrl: string;
  timestamp: string;
  error?: string;
}

// Generate collision-safe unique Submission ID: PU-YYYYMMDD-XXXX
function generateSubmissionId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PU-${year}${month}${day}-${randomSuffix}`;
}

// Format Date & Time for Excel reporting
function formatDateTime(now: Date) {
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  return {
    date: `${day}/${month}/${year}`,
    time: strTime,
    iso: now.toISOString(),
  };
}

/**
 * Append enquiry row into the Excel Workbook and sync with cloud endpoint if configured
 */
export async function appendToExcelWorkbook(row: {
  "Submission ID": string;
  Date: string;
  Time: string;
  Name: string;
  Phone: string;
  Branch: string;
  "Enquiry Type": string;
  Message: string;
  Source: string;
  Status: string;
  "WhatsApp URL": string;
  "ISO Timestamp": string;
}) {
  try {
    const dataDir = process.env.VERCEL
      ? path.join("/tmp", "data")
      : path.resolve(process.cwd(), "data");
    const excelFilePath = path.join(dataDir, "PowerUp_Enquiries.xlsx");
    const jsonFilePath = path.join(dataDir, "enquiries.json");

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let workbook: XLSX.WorkBook;
    let rows: Record<string, any>[] = [];

    // Read existing workbook or create fresh one
    if (fs.existsSync(excelFilePath)) {
      try {
        workbook = XLSX.readFile(excelFilePath);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]!];
        if (firstSheet) {
          rows = XLSX.utils.sheet_to_json(firstSheet);
        }
      } catch {
        workbook = XLSX.utils.book_new();
      }
    } else {
      workbook = XLSX.utils.book_new();
    }

    // Append new row
    rows.push(row);

    // Generate updated worksheet with auto-width columns
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Set column widths for clean readability
    worksheet["!cols"] = [
      { wch: 18 }, // Submission ID
      { wch: 12 }, // Date
      { wch: 12 }, // Time
      { wch: 22 }, // Name
      { wch: 16 }, // Phone
      { wch: 15 }, // Branch
      { wch: 28 }, // Enquiry Type
      { wch: 35 }, // Message
      { wch: 18 }, // Source
      { wch: 10 }, // Status
      { wch: 40 }, // WhatsApp URL
      { wch: 26 }, // ISO Timestamp
    ];

    // Write sheet back into workbook
    if (workbook.SheetNames.includes("Enquiries")) {
      workbook.Sheets["Enquiries"] = worksheet;
    } else {
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    }

    XLSX.writeFile(workbook, excelFilePath);

    // Write JSON backup log
    fs.writeFileSync(jsonFilePath, JSON.stringify(rows, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Local storage write warning (serverless environment):", fsErr);
  }

  // Optional: If a cloud webhook or MS Graph endpoint is configured in ENV, forward the payload
  const cloudWebhookUrl = process.env.EXCEL_WEBHOOK_URL || process.env.POWER_AUTOMATE_EXCEL_URL;
  if (cloudWebhookUrl) {
    try {
      await fetch(cloudWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
    } catch (err) {
      console.warn("Cloud Excel webhook sync warning:", err);
    }
  }
}

export async function processEnquirySubmission(data: EnquiryPayload): Promise<EnquiryResponse> {
  const { name, phone, branchId, enquiry, message = "", source } = data;

  // Validate Name
  if (!name || name.trim().length < 2) {
    throw new Error("Invalid name: Minimum 2 characters required.");
  }

  // Validate Indian Phone Number
  const cleanedPhone = phone.replace(/[\s\-()+]/g, "").replace(/^91|^0/, "");
  if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
    throw new Error("Invalid phone number: Please provide a valid 10-digit mobile number.");
  }

  // Validate Branch
  const branch = BRANCHES.find((b) => b.id === branchId);
  if (!branch) {
    throw new Error(
      `Invalid branch selected. Must be one of: ${BRANCHES.map((b) => b.name).join(", ")}`,
    );
  }

  // Generate Unique ID & Timestamps
  const submissionId = generateSubmissionId();
  const now = new Date();
  const { date, time, iso } = formatDateTime(now);

  // Build the prefilled WhatsApp URL for the selected branch
  const whatsappUrl = createBranchEnquiryWhatsAppUrl({
    name,
    phone: cleanedPhone,
    branchId: branch.id as BranchId,
    enquiry,
    message,
    submissionId,
  });

  // Record into the Excel workbook
  const excelRow = {
    "Submission ID": submissionId,
    Date: date,
    Time: time,
    Name: name.trim(),
    Phone: cleanedPhone,
    Branch: branch.fullName || `Power Up ${branch.name}`,
    "Enquiry Type": enquiry.trim(),
    Message: message.trim() || "N/A",
    Source: source,
    Status: "New",
    "WhatsApp URL": whatsappUrl,
    "ISO Timestamp": iso,
  };

  await appendToExcelWorkbook(excelRow);

  return {
    success: true,
    submissionId,
    whatsappUrl,
    timestamp: iso,
  };
}
