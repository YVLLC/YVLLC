import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY || "";
const FROM_EMAIL = "noreply@yesviral.com"; // Replace with your verified sender
const TEMPLATE_ID = process.env.POSTMARK_TEMPLATE_ID || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, orderId, serviceName, link, quantity } = req.body;

  if (!to || !orderId || !serviceName || !link || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      "https://api.postmarkapp.com/email/withTemplate",
      {
        From: FROM_EMAIL,
        To: to,
        TemplateId: TEMPLATE_ID,
        TemplateModel: {
          orderId,
          serviceName,
          link,
          quantity,
        },
      },
      {
        headers: {
          "X-Postmark-Server-Token": POSTMARK_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ success: true, messageId: response.data.MessageID });
  } catch (err: any) {
    return res.status(500).json({ error: "Postmark send failed", details: err.message });
  }
}
