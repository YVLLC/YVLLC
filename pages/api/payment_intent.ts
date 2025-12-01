// path: pages/api/payment_intent.ts
import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function allowCors(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://checkout.yesviral.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  allowCors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { amount, metadata } = req.body;

  if (!amount || typeof amount !== "number" || amount < 1) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  // Get logged in user (only if logged in)
  let userId: string | null = null;
  try {
    const { data } = await supabase.auth.getSession();
    userId = data.session?.user?.id ?? null;
  } catch {}

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },

      // ⭐ FINAL, SAFE, CLEAN METADATA FLOW ⭐
      metadata: {
        yesviral_order: metadata?.yesviral_order || "",  // base64 encoded
        user_id: userId ?? "",
      },
    });

    return res.status(200).json({
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    });
  } catch (e: any) {
    console.error("Stripe PaymentIntent Error:", e);
    return res.status(500).json({
      error: e.message || "Failed to create payment intent.",
      type: e.type || "stripe_error",
    });
  }
}
