import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10", // update to current if needed
});

export async function createCheckoutSession({
  price,
  quantity,
  successUrl,
  cancelUrl,
  metadata,
}: {
  price: number;
  quantity: number;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "YesViral Social Media Service",
            },
            unit_amount: price * 100, // Stripe expects cents
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });

    return session;
  } catch (err) {
    console.error("Stripe error:", err);
    throw new Error("Could not create Stripe session");
  }
}
