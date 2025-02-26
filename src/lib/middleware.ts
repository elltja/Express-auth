import { NextFunction, Request, Response } from "express";
import {
  signToken,
  verifyRefreshToken,
  verifyToken,
  signRefreshToken,
} from "./jwt";
import { User } from "@prisma/client";

export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedAccessToken = verifyToken(accessToken);
    if (decodedAccessToken) {
      next();
      return;
    }

    const decodedRefreshToken = verifyRefreshToken(refreshToken) as User | null;
    if (!decodedRefreshToken) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }
    const newAccessToken = signToken(decodedRefreshToken);
    const newRefreshToken = signRefreshToken(decodedRefreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}
