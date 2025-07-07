// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  password: string;
}

const USERS: { [email: string]: User } =
  global.USERS || (global.USERS = {}); // shared across API routes while running

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (USERS[email]) {
    return res.status(409).json({ message: "User already exists" });
  }

  USERS[email] = { password };
  return res.status(200).json({ message: "Signup successful" });
}
