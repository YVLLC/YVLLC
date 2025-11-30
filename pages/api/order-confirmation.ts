import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";

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

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #007BFF;">Your YesViral Order #${orderId}</h2>

        <p>Thanks for your purchase! Your order details:</p>

        <ul>
          <li><strong>Order ID:</strong> ${orderId}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Amount:</strong> ${amount}</li>
        </ul>

        <p>You can track your order anytime:</p>
        <a href="https://yesviral.com/track?order=${orderId}"
           style="background: #007BFF; padding: 10px 15px; color: white; border-radius: 8px; text-decoration: none;">
           Track Your Order
        </a>

        <p style="margin-top: 20px; color: #555;">
          If you need help, just reply to this email.
        </p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: `Your YesViral Order #${orderId}`,
      html,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Postmark send error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
