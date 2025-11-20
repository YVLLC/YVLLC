import Stripe from "stripe";
import axios from "axios";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY;

const SERVICE_IDS = {
  instagram: { Followers: 511, Likes: 483, Views: 811 },
  tiktok: { Followers: 6951, Likes: 1283, Views: 1016 },
  youtube: { Subscribers: 1238, Likes: 2450, Views: 4023 },
};

function getServiceId(platform: string, service: string) {
  const plat = SERVICE_IDS[platform.toLowerCase()];
  if (!plat) return null;
  return plat[service] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Raw body required for stripe signature verification
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook signature error: ${err.message}`);
  }

  // PAYMENT SUCCESS → PLACE FOLLOWIZ ORDER
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const platform = session.metadata.platform;
    const service = session.metadata.service;
    const target = session.metadata.target;
    const quantity = session.metadata.quantity;

    const serviceId = getServiceId(platform, service);

    if (!serviceId) {
      console.error("Invalid Followiz service ID for:", platform, service);
      return res.json({ received: true });
    }

    try {
      const followizRes = await axios.post(
        "https://followiz.com/api/v2",
        new URLSearchParams({
          key: FOLLOWIZ_API_KEY!,
          action: "add",
          service: String(serviceId),
          link: target,
          quantity: String(quantity),
        })
      );

      console.log("FOLLOWIZ ORDER:", followizRes.data);

      // TODO: Insert into DB / send email to customer
      // followizRes.data.order holds the Followiz order ID

    } catch (err: any) {
      console.error("FOLLOWIZ ORDER FAILED:", err?.response?.data || err);
    }
  }

  res.json({ received: true });
}
