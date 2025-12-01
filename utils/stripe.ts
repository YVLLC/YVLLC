// path: utils/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

/**
 * Create a PaymentIntent for YesViral checkout flow.
 * Used by /api/payment_intent → CheckoutForm → webhook → Followiz fulfillment.
 */
export async function createPaymentIntent({
  amount,
  metadata,
}: {
  amount: number;
  metadata: Record<string, string>;
}) {
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata,
  });

  return {
    id: intent.id,
    clientSecret: intent.client_secret!,
    status: intent.status,
    amount: intent.amount,
  };
}
