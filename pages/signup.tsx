// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Define custom global type extension for USERS
declare global {
  var USERS: { [email: string]: { password: string } };
}

// Ensure USERS exists on the global object
global.USERS = global.USERS || {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (global.USERS[email]) {
    return res.status(409).json({ message: "User already exists" });
  }

  global.USERS[email] = { password };

  return res.status(200).json({ message: "Signup successful" });
}
