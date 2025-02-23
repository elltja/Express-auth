import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";

export function protect(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;
  const user = verifyToken(accessToken);
  if (user) {
    next();
    return;
  }
  res.redirect("/");
}
