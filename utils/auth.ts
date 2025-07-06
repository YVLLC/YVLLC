import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export function signToken(payload: object, expiresIn: SignOptions["expiresIn"] = "7d"): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function getUserFromRequest(req: any): any {
  const token =
    req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  if (!token) return null;
  return verifyToken(token);
}
