// path: pages/api/followiz_order.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

/* ===========================================
   FOLLOWIZ CONFIG
=========================================== */

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";
const FOLLOWIZ_API_URL = "https://api.followiz.com/v2";

/* ===========================================
   NORMALIZE SERVICE NAMES
=========================================== */

const NORMALIZE_SERVICE: Record<string, string> = {
  Likes: "likes",
  Followers: "followers",
  Views: "views",
  Subscribers: "subscribers",
  Comments: "comments",
};

/* ===========================================
   SERVICE IDs (OFFICIAL FINAL MAP)
=========================================== */

const FOLLOWIZ_SERVICE_IDS = {
  youtube: {
    views: 4023,
    likes: 2450,
    subscribers: 1238,
    followers: null,
    comments: null,
  },

  tiktok: {
    views: 1016,
    likes: 1283,
    followers: 6951,
    subscribers: null,
    comments: null,
  },

  instagram: {
    views: 811,
    likes: 483,
    followers: 511,
    comments: null,
    subscribers: null,
  },
};

/* ===========================================
   CLEAN SERVICE ID EXTRACTOR — NO TS ERRORS
=========================================== */

function getServiceId(platform: string, service: string): number | null {
  const plat = platform.toLowerCase() as keyof typeof FOLLOWIZ_SERVICE_IDS;

  // normalize "Likes" -> "likes"
  const normalized =
    (NORMALIZE_SERVICE[service] || service.toLowerCase()) as keyof (typeof FOLLOWIZ_SERVICE_IDS)[typeof plat];

  const serviceMap = FOLLOWIZ_SERVICE_IDS[plat];
  if (!serviceMap) return null;

  const id = serviceMap[normalized];

  return typeof id === "number" && id > 0 ? id : null;
}

/* ===========================================
   API ROUTE HANDLER
=========================================== */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { platform, service, quantity, target } = req.body;

    if (!platform || !service || !quantity || !target) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const service_id = getServiceId(platform, service);
    if (!service_id) {
      return res
        .status(400)
        .json({ error: `Invalid or unsupported service: ${platform} ${service}` });
    }

    // Build encoded Followiz request
    const params = new URLSearchParams({
      key: FOLLOWIZ_API_KEY,
      action: "add",
      service: String(service_id),
      link: String(target),
      quantity: String(quantity),
    });

    // Call Followiz API
    const followizRes = await axios.post(FOLLOWIZ_API_URL, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = followizRes.data;

    // If Followiz returned an order id
    if (data?.order) {
      return res.status(200).json({
        success: true,
        order_id: data.order,
      });
    }

    // If Followiz returned an error
    return res.status(400).json({
      error: data?.error || "Followiz returned an unknown error.",
    });
  } catch (error: any) {
    console.error("❌ Followiz Order Error:", error?.response?.data || error);
    return res.status(500).json({
      error: "Failed to place Followiz order.",
      details: error?.response?.data || error.message,
    });
  }
}
