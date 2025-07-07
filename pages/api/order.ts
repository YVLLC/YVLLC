// pages/api/admin/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // You could fetch real orders from your DB here
    const mockOrders = [
      {
        _id: "1",
        orderId: 123456,
        service: "Instagram Followers",
        link: "@username",
        quantity: 100,
        status: "Completed",
        createdAt: new Date().toISOString(),
      },
    ];

    return res.status(200).json({ orders: mockOrders });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
