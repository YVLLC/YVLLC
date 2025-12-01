// path: utils/stripe.ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ Missing STRIPE_SECRET_KEY in environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

/**
 * Create a PaymentIntent for YesViral checkout flow.
 *
 * Flow:
 *   CheckoutForm.tsx → /api/payment_intent → createPaymentIntent() 
 *   → clientSecret returned to browser → payment confirmation
 *   → Stripe Webhook → Followiz Order → Supabase Insert → Email Receipt
 *
 * This file MUST remain simple + stable.
 */
export async function createPaymentIntent({
  amount,
  metadata,
  customerEmail,
}: {
  amount: number; // amount in cents
  metadata: Record<string, string>;
  customerEmail?: string | null;
}) {
  if (!amount || amount < 0) {
    throw new Error("PaymentIntent error: amount must be >= 0");
  }

  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },

    /**
     * IMPORTANT:
     * Metadata MUST remain strings ONLY.
     * Never store objects or numbers (Stripe converts ALL metadata to strings).
     */
    metadata: metadata || {},

    receipt_email: customerEmail || undefined,
  });

  return {
    id: intent.id,
    clientSecret: intent.client_secret!,
    status: intent.status,
    amount: intent.amount,
  };
}
