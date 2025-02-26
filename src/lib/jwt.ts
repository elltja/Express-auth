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
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24,
  });
}

export function verifyToken(token: string) {
  if (!token) return null;
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function signRefreshToken(userData: User) {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  const payload = {
    username: userData.username,
    email: userData.email,
    id: userData.id,
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
}

export function verifyRefreshToken(token: string) {
  if (!token) return null;
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
