import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Dummy order data – replace with DB later if needed
const ORDERS = [
  {
    _id: "1",
    orderId: "123456",
    service: "Instagram Followers",
    link: "https://instagram.com/yourpage",
    quantity: 1000,
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    orderId: "789012",
    service: "TikTok Likes",
    link: "https://tiktok.com/@user/video/xyz",
    quantity: 500,
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
];

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔐 Check Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET); // Throws error if invalid
    return res.status(200).json({ orders: ORDERS });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
