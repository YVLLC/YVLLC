import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const JAP_API_KEY = process.env.JAP_API_KEY || "YOUR_JAP_API_KEY";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { serviceId, link, quantity } = req.body;

  if (!serviceId || !link || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.post("https://justanotherpanel.com/api/v2", null, {
      params: {
        key: JAP_API_KEY,
        action: "add",
        service: serviceId,
        link,
        quantity,
      },
    });

    if (response.data && response.data.order) {
      return res.status(200).json({ success: true, orderId: response.data.order });
    } else {
      return res.status(500).json({ error: "Invalid response from JAP API", raw: response.data });
    }
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to create order", details: err.message });
  }
}
