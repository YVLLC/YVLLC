// path: pages/api/stripe-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { getOrderConfirmationHtml } from "@/lib/emailTemplates";

export const config = {
  api: { bodyParser: false },
};

// Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

// Followiz API key
const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";

// Supabase (service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Followiz service IDs
const SERVICE_IDS: Record<string, Record<string, number>> = {
  instagram: { Followers: 511, Likes: 483, Views: 811 },
  tiktok: { Followers: 6951, Likes: 1283, Views: 1016 },
  youtube: { Subscribers: 1238, Likes: 2450, Views: 4023 },
};

function getServiceId(platform: string, service: string): number | null {
  const p = SERVICE_IDS[platform?.toLowerCase()];
  return p?.[service] ?? null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  //
  // ⭐ RAW BODY FIX FOR NEXT.JS 15 / TYPESCRIPT / NODE 18
  //
  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    // Convert strings into Uint8Array
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  }

  const body = Buffer.concat(chunks);

  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  // Verify signature
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send("Webhook signature error");
  }

  // Only process succeeded payments
  if (event.type !== "payment_intent.succeeded") {
    return res.json({ received: true });
  }

  const pi = event.data.object as Stripe.PaymentIntent;

  // Decode order metadata
  const encoded = pi.metadata?.yesviral_order;
  if (!encoded) return res.json({ received: true });

  let orderData: any = {};
  try {
    orderData = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  } catch {
    console.error("❌ Failed to decode metadata JSON");
    return res.json({ received: true });
  }

  // Extract order info
  const quantity = Number(orderData.amount) || Number(orderData.quantity) || 1;
  const platform = orderData.platform || "Unknown Platform";
  const service = orderData.service || "Unknown Service";

  const target =
    orderData.reference ||
    orderData.target ||
    orderData.url ||
    "No Link Provided";

  const total = Number(orderData.total) || 0;

  // Email extraction (safe)
  const email =
    orderData.email ||
    pi.metadata?.email ||
    pi.receipt_email ||
    "";

  // Try to resolve user_id
  let userId: string | null =
    orderData.user_id?.trim() ||
    pi.metadata?.user_id?.trim() ||
    null;

  // Resolve user by email if not provided
  if ((!userId || userId === "") && email) {
    try {
      const { data: usersData, error: listErr } =
        await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 10000,
        });

      if (!listErr && usersData?.users?.length > 0) {
        const found = usersData.users.find((u: any) => u.email === email);
        if (found) {
          userId = found.id;
          console.log("✅ Resolved user via email:", userId);
        }
      }
    } catch (err) {
      console.error("❌ Supabase user lookup failed:", err);
    }
  }

  //
  // ⭐ Send Followiz order
  //
  const serviceId = getServiceId(platform, service);
  let followizOrderId: number | null = null;

  try {
    if (serviceId) {
      const params = new URLSearchParams({
        key: FOLLOWIZ_API_KEY,
        action: "add",
        service: String(serviceId),
        link: target,
        quantity: String(quantity),
      });

      const fwRes = await axios.post(
        "https://followiz.com/api/v2",
        params.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      followizOrderId = fwRes.data?.order || null;
      console.log("🔥 Followiz order placed:", followizOrderId);
    }
  } catch (err: any) {
    console.error("❌ Followiz Error:", err.response?.data || err);
  }

  //
  // ⭐ Insert order into Supabase
  //
  const { error: dbErr } = await supabase.from("orders").insert([
    {
      user_id: userId || null,
      email: email || null,
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

  if (dbErr) console.error("❌ Supabase Insert Error:", dbErr);

  //
  // ⭐ Send Confirmation Email
  //
  try {
    if (email) {
      const html = getOrderConfirmationHtml({
        orderId: followizOrderId || "Pending",
        platform,
        service,
        target,
        quantity,
        total,
      });

      await sendEmail({
        to: email,
        subject: `YesViral Order Confirmation #${followizOrderId || "Pending"}`,
        html,
      });

      console.log("📧 Confirmation email sent");
    }
  } catch (err) {
    console.error("❌ Email send error:", err);
  }

  return res.json({ received: true });
}
