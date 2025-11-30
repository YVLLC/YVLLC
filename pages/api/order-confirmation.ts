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
    const { email, orderId, service, amount } = req.body;

    if (!email || !orderId)
      return res.status(400).json({ error: "Missing required fields" });

    // PREMIUM ORDER CONFIRMATION TEMPLATE
    const html = getOrderConfirmationHtml({
      orderId,
      platform: "Social Platform",
      service,
      target: "Customer Provided Link",
      quantity: 0,
      total: amount,
    });

    await sendEmail({
      to: email,
      subject: `Your YesViral Order #${orderId} is Confirmed`,
      html,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Postmark send error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
