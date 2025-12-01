import type { NextApiRequest, NextApiResponse } from "next";

// Normalize input service names (from your modal)
const NORMALIZE_SERVICE: Record<string, string> = {
  Likes: "likes",
  Followers: "followers",
  Views: "views",
  Subscribers: "subscribers",
  Comments: "comments",
};

// FOLLOWIZ SERVICE IDS
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

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY!;

function getServiceId(platform: string, service: string): number | null {
  const plat = platform.toLowerCase();

  const normalized = NORMALIZE_SERVICE[service] || service.toLowerCase();

  const id = FOLLOWIZ_SERVICE_IDS[plat]?.[normalized];

  return typeof id === "number" && id > 0 ? id : null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { platform, service, quantity, target } = req.body;

  const service_id = getServiceId(platform, service);

  if (!service_id) {
    return res.status(400).json({ error: "Invalid or unsupported service selected." });
  }

  const params = new URLSearchParams({
    key: FOLLOWIZ_API_KEY,
    action: "add",
    service: String(service_id),
    link: String(target),
    quantity: String(quantity),
  });

  try {
    const followizRes = await fetch("https://api.followiz.com/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    let data;
    try {
      data = await followizRes.json();
    } catch {
      return res.status(500).json({
        error: "Followiz returned non-JSON (panel offline or key incorrect).",
      });
    }

    if (data.order) {
      return res.status(200).json({ success: true, order: data.order });
    } else {
      return res.status(400).json({
        error: data.error || "Followiz API returned an error.",
      });
    }
  } catch (e) {
    console.error("Followiz Order Error:", e);
    return res.status(500).json({ error: "Followiz request failed." });
  }
}
