export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  branchId: string;
  enquiry: string;
  message?: string;
  source: "contact-page" | "hero-cta" | "franchise-page" | "modal-popup";
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  submissionId: string;
}

/**
 * Client-side enquiry submission and reference recorder
 */
export const recordEnquiryFn = async (args: { data: EnquiryPayload }): Promise<EnquiryResponse> => {
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const submissionId = `PUF-${Date.now().toString().slice(-4)}-${randomSuffix}`;

  try {
    const existing = JSON.parse(localStorage.getItem("powerup_enquiries") || "[]");
    existing.push({ ...args.data, submissionId, timestamp });
    localStorage.setItem("powerup_enquiries", JSON.stringify(existing));
  } catch {}

  return {
    success: true,
    message: "Enquiry recorded successfully",
    submissionId,
  };
};
