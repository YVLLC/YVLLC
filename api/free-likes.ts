import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const JAP_API_KEY = process.env.JAP_API_KEY || "";
const FREE_LIKES_SERVICE_ID = 1845; // Instagram Likes
const SENT_CACHE: { [key: string]: boolean } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, email } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!username || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const key = `${email}_${ip}`;

  if (SENT_CACHE[key]) {
    return res.status(429).json({ error: "You already received your free likes." });
  }

  try {
    const link = `https://instagram.com/${username}`;

    const response = await axios.post("https://justanotherpanel.com/api/v2", null, {
      params: {
        key: JAP_API_KEY,
        action: "add",
        service: FREE_LIKES_SERVICE_ID,
        link,
        quantity: 5,
      },
    });

    if (response.data && response.data.order) {
      SENT_CACHE[key] = true;
      return res.status(200).json({ success: true, orderId: response.data.order });
    } else {
      return res.status(500).json({ error: "JAP API failed", details: response.data });
    }
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to submit order", details: err.message });
  }
}
