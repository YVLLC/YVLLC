import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10", // downgrade to match installed Stripe version
});

export async function createCheckoutSession({
  price,
  success_url,
  cancel_url,
}: {
  price: number;
  success_url: string;
  cancel_url: string;
}) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "YesViral Social Media Service",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url,
    cancel_url,
  });
}
