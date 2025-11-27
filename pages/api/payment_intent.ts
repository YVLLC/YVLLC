// path: pages/api/payment_intent.ts
import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

// 🔥 IMPORTANT — Allow checkout.yesviral.com to call this API
function allowCors(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://checkout.yesviral.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS FIRST
  allowCors(res);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { amount, metadata } = req.body;

  if (!amount || typeof amount !== "number" || amount < 1) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },

      // SAVE
