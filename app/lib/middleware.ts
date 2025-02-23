import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";

export function protect(req: Request, res: Response, next: NextFunction) {
  if (
    !req.cookies ||
    !req.cookies.accessToken ||
    !verifyToken(req.cookies.accessToken)
  ) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
  return;
}
