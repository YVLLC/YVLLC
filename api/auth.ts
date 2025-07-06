import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const USERS: { [email: string]: { password: string } } = {
  "admin@yesviral.com": { password: "testadmin123" },
};

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, mode } = req.body;

  if (!email || !password || !mode) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (mode === "login") {
    const user = USERS[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } else if (mode === "signup") {
    if (USERS[email]) {
      return res.status(409).json({ error: "User already exists" });
    }
    USERS[email] = { password };
  } else {
    return res.status(400).json({ error: "Invalid mode" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(200).json({ token });
}
