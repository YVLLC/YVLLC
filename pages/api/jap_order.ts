import type { NextApiRequest, NextApiResponse } from "next";

// Define the type for platforms and services
type PlatformKey = "youtube" | "tiktok" | "instagram";
type ServiceKey =
  | "views"
  | "likes"
  | "subscribers"
  | "followers"
  | "comments";

// Strongly type your JAP service IDs object
const JAP_SERVICE_IDS: Record<PlatformKey, Record<ServiceKey, number>> = {
  youtube: { views: 876, likes: 1381, subscribers: 9533, followers: 0, comments: 0 },
  tiktok: { followers: 1581, views: 10019, likes: 10025, subscribers: 0, comments: 0 },
  instagram: { followers: 3305, likes: 1845, views: 513, comments: 9565, subscribers: 0 },
};

const JAP_API_KEY = process.env.JAP_API_KEY as string;

// Helper to safely get service ID
function getServiceId(platform: string, service: string): number | null {
  const plat = platform.toLowerCase() as PlatformKey;
  const serv = service.toLowerCase() as ServiceKey;
  if (!JAP_SERVICE_IDS[plat]) return null;
  if (!JAP_SERVICE_IDS[plat][serv]) return null;
  const id = JAP_SERVICE_IDS[plat][serv];
  return id > 0 ? id : null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { platform, service, quantity, target, paymentId } = req.body;
  const service_id = getServiceId(platform, service);
  if (!service_id)
    return res.status(400).json({ error: "Invalid JAP service." });

  // JAP API expects: key, action, service, link, quantity
  const params = new URLSearchParams();
  params.append("key", JAP_API_KEY);
  params.append("action", "add");
  params.append("service", service_id.toString());
  params.append("link", target);
  params.append("quantity", quantity.toString());

  try {
    const japRes = await fetch("https://justanotherpanel.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await japRes.json();
    if (data.order) {
      return res.status(200).json({ success: true, order: data.order });
    } else {
      return res.status(400).json({ error: data.error || "JAP error." });
    }
  } catch (e) {
    return res.status(500).json({ error: "JAP request failed." });
  }
}
