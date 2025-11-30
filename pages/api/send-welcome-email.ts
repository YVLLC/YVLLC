import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";
import { getWelcomeEmailHtml } from "@/lib/emailTemplates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Missing email" });

  try {
    await sendEmail({
      to: email,
      subject: "🎉 Welcome to YesViral — Your Account Is Ready!",
      html: getWelcomeEmailHtml({ name: email.split("@")[0] }),
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
