import { ServerClient } from "postmark";

const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY || "";
const POSTMARK_TEMPLATE_ID = process.env.POSTMARK_TEMPLATE_ID || "";

const client = new ServerClient(POSTMARK_API_KEY);

type EmailPayload = {
  to: string;
  subject: string;
  templateModel: Record<string, any>;
};

export async function sendEmail({ to, subject, templateModel }: EmailPayload) {
  if (!POSTMARK_API_KEY || !POSTMARK_TEMPLATE_ID) {
    console.warn("Postmark keys not configured");
    return;
  }

  try {
    const result = await client.sendEmailWithTemplate({
      From: "no-reply@yesviral.com", // Or your verified sending address
      To: to,
      TemplateId: parseInt(POSTMARK_TEMPLATE_ID),
      TemplateModel: {
        subject,
        ...templateModel,
      },
    });

    console.log("Email sent:", result.Message);
  } catch (error) {
    console.error("Email error:", error);
  }
}
