// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const USERS: { [email: string]: { password: string } } = {
  "admin@yesviral.com": { password: "testadmin123" },
};

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, mode } = req.body;

  if (!email || !password || !mode) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (mode === "login") {
    const user = USERS[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else if (mode === "signup") {
    if (USERS[email]) {
      return res.status(409).json({ message: "User already exists" });
    }
    USERS[email] = { password };
  } else {
    return res.status(400).json({ message: "Invalid mode" });
  }

  try {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(500).json({ message: "Token generation failed" });
  }
}
