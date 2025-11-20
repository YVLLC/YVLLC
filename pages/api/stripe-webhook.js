// path: pages/api/stripe-webhook.js
import Stripe from "stripe";
import axios from "axios";

export const config = {
  api: { bodyParser: false },
};

// NO "!" here – plain JS
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY;

// Your Followiz service IDs
const SERVICE_IDS = {
  instagram: { Followers: 511, Likes: 483, Views: 811 },
  tiktok: { Followers: 6951, Likes: 1283, Views: 1016 },
  youtube: { Subscribers: 1238, Likes: 2450, Views: 4023 },
};

// NO type annotations here in JS
function getServiceId(platform, service) {
  if (!platform || !service) return null;
  const plat = SERVICE_IDS[platform.toLowerCase()];
  if (!plat) return null;
  return plat[service] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Raw body for Stripe signature verification
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks);

  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook signature error: ${err.message}`);
  }

  // ✅ PaymentIntent flow (what you're using now)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    // This is what we stored in /api/payment_intent metadata
    const encodedOrder = paymentIntent.metadata
      ? paymentIntent.metadata.yesviral_order
      : null;

    if (!encodedOrder) {
      console.warn("No yesviral_order metadata on payment intent.");
      return res.json({ received: true });
    }

    let order;
    try {
      order = JSON.parse(encodedOrder);
    } catch (e) {
      console.error("Failed to parse yesviral_order metadata:", e);
      return res.json({ received: true });
    }

    const platform = order.platform;   // e.g. "Instagram"
    const service = order.service;     // e.g. "Followers"
    const target = order.reference;    // link / username
    const quantity = order.amount;     // number

    const serviceId = getServiceId(platform, service);

    if (!serviceId) {
      console.error("Invalid Followiz service ID for:", platform, service);
      return res.json({ received: true });
    }

    try {
      const params = new URLSearchParams({
        key: FOLLOWIZ_API_KEY || "",
        action: "add",
        service: String(serviceId),
        link: String(target),
        quantity: String(quantity),
      });

      const followizRes = await axios.post(
        "https://followiz.com/api/v2",
        params
      );

      console.log("FOLLOWIZ ORDER RESPONSE:", followizRes.data);

      // If you later want to:
      // - save to DB
      // - send Postmark email
      // you do it here using followizRes.data.order (their order id)

    } catch (err) {
      console.error(
        "FOLLOWIZ ORDER FAILED:",
        err.response?.data || err.message || err
      );
    }
  }

  // You can keep listening for other events if you want, but always respond:
  res.json({ received: true });
}
