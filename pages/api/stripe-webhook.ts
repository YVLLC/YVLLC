// path: pages/api/stripe-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { ServerClient } from "postmark";
import { getOrderConfirmationHtml } from "@/lib/emailTemplates";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const postmark = new ServerClient(process.env.POSTMARK_SERVER_TOKEN as string);
const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Your Followiz service IDs
const SERVICE_IDS: Record<
  string,
  Record<string, number>
> = {
  instagram: { Followers: 511, Likes: 483, Views: 811 },
  tiktok: { Followers: 6951, Likes: 1283, Views: 1016 },
  youtube: { Subscribers: 1238, Likes: 2450, Views: 4023 },
};

function getServiceId(platform: string, service: string): number | null {
  const plat = SERVICE_IDS[platform.toLowerCase()];
  if (!plat) return null;
  const id = plat[service as keyof typeof plat];
  return typeof id === "number" && id > 0 ? id : null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = Buffer.concat(chunks);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook signature error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;

    const encoded = pi.metadata?.yesviral_order;
    if (!encoded) {
      console.error("⚠️ No yesviral_order metadata found.");
      return res.json({ received: true });
    }

    let order: any;
    try {
      order = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
    } catch (err) {
      console.error("❌ Metadata decode fail:", err);
      return res.json({ received: true });
    }

    const quantity: number = Number(order.quantity);
    const platform: string = order.platform;
    const service: string = order.service;
    const target: string = order.reference;
    const total: number = Number(order.total);
    const supabaseUserId: string | null = (pi.metadata?.user_id as string) || null;
    const email: string =
      order.email || (pi.receipt_email as string) || "";

    if (!quantity || quantity <= 0 || !Number.isFinite(quantity)) {
      console.error("❌ Invalid quantity in metadata:", order.quantity);
      return res.json({ received: true });
    }

    const serviceId = getServiceId(platform, service);
    if (!serviceId) {
      console.error("❌ Invalid Followiz service:", platform, service);
      return res.json({ received: true });
    }

    // 🔹 Place Followiz order
    let followizOrderId: number | null = null;
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
        params.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      followizOrderId = followizRes.data?.order || null;
      console.log("✅ Followiz order created:", followizOrderId);
    } catch (err: any) {
      console.error("❌ Followiz API error:", err.response?.data || err);
    }

    // 🔹 Insert order in Supabase regardless
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

    if (dbErr) console.error("❌ Supabase error:", dbErr);

    // 🔹 Send confirmation email
    try {
      if (email) {
        await postmark.sendEmail({
          From: process.env.EMAIL_FROM as string,
          To: email,
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
      }
    } catch (err) {
      console.error("❌ Email failed:", err);
    }
  }

  return res.json({ received: true });
}
