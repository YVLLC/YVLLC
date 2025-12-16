import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY!;
const SERVICE_ID = Number(process.env.FOLLOWIZ_FREE_LIKES_SERVICE_ID || 1845);
const LIKES_QUANTITY = 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postUrl, email, captchaToken } = req.body;

  /* --------------------------------------------------------
     CAPTCHA VERIFICATION
  --------------------------------------------------------- */
  if (!captchaToken) {
    return res.status(403).json({ message: "Captcha required" });
  }

  try {
    const captchaVerify = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: captchaToken,
      })
    );

    if (!captchaVerify.data.success) {
      return res.status(403).json({ message: "Captcha failed" });
    }
  } catch {
    return res.status(403).json({ message: "Captcha verification failed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  if (!postUrl || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!postUrl.includes("instagram.com")) {
    return res.status(400).json({
      message: "Please enter a valid Instagram post URL",
    });
  }

  const normalizedPostUrl = postUrl.trim();

  /* --------------------------------------------------------
     CHECK IF FREE TRIAL ALREADY USED
  --------------------------------------------------------- */
  const { data: existing, error: existingError } = await supabase
    .from("free_trials")
    .select("id")
    .or(
      `email.eq.${email},post_url.eq.${normalizedPostUrl},ip_address.eq.${ip}`
    )
    .limit(1)
    .maybeSingle();

  if (existing) {
    return res.status(200).json({ status: "already_used" });
  }

  if (existingError) {
    return res.status(500).json({ message: "Database check failed" });
  }

  /* --------------------------------------------------------
     SUBMIT FOLLOWIZ ORDER
  --------------------------------------------------------- */
  try {
    const followizResponse = await axios.post(
      "https://followiz.com/api/v2",
      {
        key: FOLLOWIZ_API_KEY,
        action: "add",
        service: SERVICE_ID,
        link: normalizedPostUrl,
        quantity: LIKES_QUANTITY,
      },
      { timeout: 10000 }
    );

    if (!followizResponse.data?.order) {
      return res.status(500).json({
        message: "Followiz order failed",
        details: followizResponse.data,
      });
    }

    const orderId = String(followizResponse.data.order);

    /* --------------------------------------------------------
       SAVE FREE TRIAL RECORD (NON-BLOCKING)
    --------------------------------------------------------- */
    await supabase
      .from("free_trials")
      .upsert(
        {
          email,
          post_url: normalizedPostUrl,
          ip_address: ip,
          followiz_order_id: orderId,
          status: "completed",
        },
        { onConflict: "post_url" }
      );

    /* --------------------------------------------------------
       ALWAYS RETURN SUCCESS AFTER FOLLOWIZ
    --------------------------------------------------------- */
    return res.status(200).json({
      success: true,
      orderId,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "Failed to submit Followiz order",
      error: err?.message,
    });
  }
}
