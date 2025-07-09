import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

// MAKE SURE THIS IS YOUR SECRET KEY! (starts with sk_live_... or sk_test_...)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount < 1) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (e: any) {
    // Better error reporting for debugging
    return res.status(500).json({
      error: e.message || "Failed to create payment intent.",
      type: e.type || "stripe_error",
    });
  }
}
