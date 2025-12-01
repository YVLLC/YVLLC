import Stripe from "stripe";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { ServerClient } from "postmark";
import { getOrderConfirmationHtml } from "@/lib/emailTemplates";

export const config = {
  api: { bodyParser: false },
};

// Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

// Postmark client
const postmark = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// Followiz API
const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY;

// Supabase (Service Role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Followiz service IDs
const SERVICE_IDS = {
  instagram: { Followers: 511, Likes: 483, Views: 811 },
  tiktok: { Followers: 6951, Likes: 1283, Views: 1016 },
  youtube: { Subscribers: 1238, Likes: 2450, Views: 4023 },
};

function getServiceId(platform, service) {
  if (!platform || !service) return null;
  const plat = SERVICE_IDS[platform.toLowerCase()];
  if (!plat) return null;
  return plat[service] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Collect raw body for Stripe validation
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
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
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook signature error: ${err.message}`);
  }

  // Handle successful payments
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;

    const encodedOrder = pi.metadata ? pi.metadata.yesviral_order : null;
    if (!encodedOrder) {
      console.warn("⚠️ No yesviral_order metadata.");
      return res.json({ received: true });
    }

    let order;
    try {
      order = JSON.parse(encodedOrder);
    } catch (err) {
      console.error("❌ Failed to parse order metadata:", err);
      return res.json({ received: true });
    }

    const platform = order.platform;
    const service = order.service;
    const target = order.reference;
    const quantity = order.amount;
    const total = Number(order.total) || 0;

    const supabaseUserId = pi.metadata?.user_id || null;

    const serviceId = getServiceId(platform, service);
    if (!serviceId) {
      console.error("❌ Invalid service ID:", platform, service);
      return res.json({ received: true });
    }

    let followizOrderId = null;

    // Submit order to Followiz
    try {
      const params = new URLSearchParams({
        key: FOLLOWIZ_API_KEY,
        action: "add",
        service: String(serviceId),
        link: String(target),
        quantity: String(quantity),
      });

      const followizRes = await axios.post(
        "https://followiz.com/api/v2",
        params
      );

      console.log("✅ FOLLOWIZ ORDER:", followizRes.data);
      followizOrderId = followizRes.data.order;
    } catch (err) {
      console.error("❌ FOLLOWIZ ORDER FAILED:", err.response?.data || err);
    }

    // Insert into Supabase
    const { error: dbErr } = await supabase.from("orders").insert([
      {
        user_id: supabaseUserId,
        platform,
        service,
        target_url: target,
        quantity,
        price_paid: total,
        followiz_order_id: followizOrderId,
        status: "processing",
        refill_until: new Date(Date.now() + 30 * 86400000).toISOString(),
      },
    ]);

    if (dbErr) {
      console.error("❌ SUPABASE INSERT ERROR:", dbErr);
    } else {
      console.log("✅ Order saved to Supabase.");
    }

    // ✉️ Premium Order Confirmation Email
    try {
      await postmark.sendEmail({
        From: process.env.EMAIL_FROM,
        To: order.email ?? pi.receipt_email,
        Subject: `Your YesViral Order #${followizOrderId || "Pending"}`,
        HtmlBody: getOrderConfirmationHtml({
          orderId: followizOrderId || "Pending",
          platform,
          service,
          target,
          quantity,
          total,
        }),
        MessageStream: "outbound",
      });

      console.log("📨 Order email sent successfully.");
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr);
    }
  }

  res.json({ received: true });
}
