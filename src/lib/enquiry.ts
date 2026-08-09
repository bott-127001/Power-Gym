import { createServerFn } from "@tanstack/react-start";
import type { EnquiryPayload, EnquiryResponse } from "./enquiry.server";

export type { EnquiryPayload, EnquiryResponse };

/**
 * Isomorphic Server Function to submit enquiries and record to Excel
 */
export const recordEnquiryFn = createServerFn({ method: "POST" })
  .validator((data: EnquiryPayload) => data)
  .handler(async ({ data }): Promise<EnquiryResponse> => {
    // Dynamically import server-only module on the server
    const { processEnquirySubmission } = await import("./enquiry.server");
    return processEnquirySubmission(data);
  });
