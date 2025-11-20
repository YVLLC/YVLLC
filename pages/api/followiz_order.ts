import type { NextApiRequest, NextApiResponse } from "next";

// Define platform + service key types
type PlatformKey = "youtube" | "tiktok" | "instagram";
type ServiceKey =
  | "views"
  | "likes"
  | "subscribers"
  | "followers"
  | "comments";

// FOLLOWIZ SERVICE IDS (FINAL)
const FOLLOWIZ_SERVICE_IDS: Record<PlatformKey, Record<ServiceKey, number>> = {
  youtube: {
    views: 4023,        // YouTube Views
    likes: 2450,        // YouTube Likes
    subscribers: 1238,  // YouTube Subscribers
    followers: 0,
    comments: 0,
  },

  tiktok: {
    views: 1016,        // TikTok Views
    likes: 1283,        // TikTok Likes
    followers: 6951,    // TikTok Followers
    subscribers: 0,
    comments: 0,
  },

  instagram: {
    views: 811,         // IG Views
    likes: 483,         // IG Likes
    followers: 511,     // IG Followers
    comments: 0,
    subscribers: 0,
  },
};

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY as string;

// Safely get service ID from map
function getServiceId(platform: string, service: string): number | null {
  const plat = platform.toLowerCase() as PlatformKey;
  const serv = service.toLowerCase() as ServiceKey;

  if (!FOLLOWIZ_SERVICE_IDS[plat]) return null;
  if (!FOLLOWIZ_SERVICE_IDS[plat][serv]) return null;

  const id = FOLLOWIZ_SERVICE_IDS[plat][serv];
  return id > 0 ? id : null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only POST
  if (req.method !== "POST") return res.status(405).end();

  const { platform, service, quantity, target } = req.body;

  // Get the Followiz service ID
  const service_id = getServiceId(platform, service);

  if (!service_id) {
    return res.status(400).json({ error: "Invalid service selected." });
  }

  // Build Followiz form-encoded body
  const params = new URLSearchParams();
  params.append("key", FOLLOWIZ_API_KEY);
  params.append("action", "add");
  params.append("service", service_id.toString());
  params.append("link", target);
  params.append("quantity", quantity.toString());

  try {
    // Send order to Followiz API
    const followizRes = await fetch("https://api.followiz.com", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await followizRes.json();

    if (data.order) {
      // SUCCESS
      return res.status(200).json({
        success: true,
        order: data.order,
      });
    } else {
      // FAIL
      return res
        .status(400)
        .json({ error: data.error || "Followiz API returned an error." });
    }
  } catch (e: any) {
    console.error("Followiz Order Error:", e);
    return res.status(500).json({ error: "Followiz request failed." });
  }
}
