// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Extend globalThis so TypeScript knows about USERS
declare global {
  var USERS: { [email: string]: { password: string } };
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Use global to store users in-memory
global.USERS = global.USERS || {
  "admin@yesviral.com": { password: "testadmin123" },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, mode } = req.body;

  if (!email || !password || !mode) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (mode === "login") {
    const user = global.USERS[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } else if (mode === "signup") {
    if (global.USERS[email]) {
      return res.status(409).json({ error: "User already exists" });
    }
    global.USERS[email] = { password };
  } else {
    return res.status(400).json({ error: "Invalid mode" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
  );

  return res.status(200).json({ token });
}
