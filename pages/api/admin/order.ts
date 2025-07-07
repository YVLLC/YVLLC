// pages/api/admin/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Dummy data – replace with your DB or real orders
const ORDERS = [
  {
    _id: "1",
    orderId: "123456",
    service: "Instagram Followers",
    link: "@username",
    quantity: 100,
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    orderId: "123457",
    service: "YouTube Views",
    link: "https://youtube.com/video",
    quantity: 5000,
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ orders: ORDERS });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
