import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";
import { getOrderConfirmationHtml } from "@/lib/emailTemplates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, orderId, platform, service, target, quantity, amount } =
      req.body;

    if (!email || !orderId) {
      return res
        .status(400)
        .json({ error: "Missing email or order ID" });
    }

    // SAFE FALLBACKS — prevents template breakage
    const html = getOrderConfirmationHtml({
      orderId,
      platform: platform || "Unknown Platform",
      service: service || "Service",
      target: target || "Not Provided",
      quantity: quantity || 1,
      total: amount || 0,
    });

    await sendEmail({
      to: email,
      subject: `Your YesViral Order #${orderId} is Confirmed`,
      html,
    });

    return res.json({ success: true });
  } catch (err: any) {
    console.error("Postmark send error:", err);
    return res
      .status(500)
      .json({ error: "Failed to send email", details: err.message });
  }
}
