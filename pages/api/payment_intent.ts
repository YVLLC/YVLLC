// path: pages/api/payment_intent.ts
import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

// Server-side Supabase client (anon key is fine for reading session)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Allow requests from your embedded checkout
function allowCors(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://checkout.yesviral.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  allowCors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { amount, metadata } = req.body;

  if (!amount || typeof amount !== "number" || amount < 1) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  /* -------------------------------------------------------------
      🔥 GET SUPABASE SESSION → USER ID
      If user is logged in → use their user_id
      If not logged in → user_id = null (guest checkout)
  ------------------------------------------------------------- */
  let userId: string | null = null;

  try {
    const { data } = await supabase.auth.getSession();
    userId = data.session?.user?.id ?? null;
  } catch (e) {
    console.log("No session found (guest checkout).");
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },

      metadata: {
        yesviral_order: metadata?.order || "",
        user_id: userId || "", // IMPORTANT!!
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e: any) {
    console.error("Stripe PaymentIntent Error:", e);
    return res.status(500).json({
      error: e.message || "Failed to create payment intent.",
      type: e.type || "stripe_error",
    });
  }
}
