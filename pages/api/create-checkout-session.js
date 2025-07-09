import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { platform, service, quantity, target, price } = req.body;
  if (!platform || !service || !quantity || !target || !price)
    return res.status(400).json({ error: "Missing info" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: `${platform} ${service}` },
          unit_amount: Math.round((price / quantity) * 100),
        },
        quantity,
      }],
      mode: "payment",
      success_url: "https://yourdomain.com/success",
      cancel_url: "https://yourdomain.com/cancel",
      metadata: { platform, service, quantity, target }
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Stripe error' });
  }
}
