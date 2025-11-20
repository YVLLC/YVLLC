import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

// Secret Key (test or live)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  // We expect: amount + encoded metadata string
  const { amount, metadata } = req.body;

  if (!amount || typeof amount !== "number" || amount < 1) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },

      // 🔥 This is the ONLY metadata we store. SAFE. STRIPE CAN’T READ IT.
      metadata: metadata || {},
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e: any) {
    return res.status(500).json({
      error: e.message || "Failed to create payment intent.",
      type: e.type || "stripe_error",
    });
  }
}
