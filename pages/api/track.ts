import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Missing orderId" });
  }

  try {
    // Followiz uses form-urlencoded, NOT JSON or params
    const response = await axios.post(
      "https://api.followiz.com/v2",
      new URLSearchParams({
        key: FOLLOWIZ_API_KEY,
        action: "status",
        order: orderId.toString(),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data) {
      return res.status(200).json({ success: true, data: response.data });
    } else {
      return res.status(500).json({ error: "Invalid response from Followiz API" });
    }
  } catch (err: any) {
    return res.status(500).json({
      error: "Failed to track order",
      details: err.message,
    });
  }
}
