// path: pages/api/payment_intent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createPaymentIntent } from "@/utils/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { amount, metadata, email, user_id } = req.body;

    if (!amount || typeof amount !== "number" || amount < 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!metadata || typeof metadata.yesviral_order !== "string") {
      return res.status(400).json({ error: "Missing order metadata" });
    }

    const intent = await createPaymentIntent({
      amount,

      // ⭐ METADATA UPDATED
      metadata: {
        ...metadata,
        email: email || "",     // ⭐ ADDED
        user_id: user_id || "", // ⭐ EXISTING FIX
      },
    });

    return res.status(200).json({
      clientSecret: intent.clientSecret,
      id: intent.id,
      status: intent.status,
      amount: intent.amount,
    });
  } catch (err: any) {
    console.error("❌ createPaymentIntent error:", err);
    return res.status(500).json({
      error: err.message || "Failed to create payment intent.",
    });
  }
}
