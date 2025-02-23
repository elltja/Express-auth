import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export function signToken(userData: User) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const payload = {
    username: userData.username,
    email: userData.email,
    id: userData.id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
}

export function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}
