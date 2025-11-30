import { ServerClient } from "postmark";

if (!process.env.POSTMARK_SERVER_TOKEN) {
  throw new Error("Missing POSTMARK_SERVER_TOKEN");
}

export const postmark = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return postmark.sendEmail({
    From: process.env.EMAIL_FROM!,
    To: to,
    Subject: subject,
    HtmlBody: html,
    MessageStream: "outbound",
  });
}
