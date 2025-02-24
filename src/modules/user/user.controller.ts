import { Request, Response } from "express";
import { User } from "@prisma/client";
import { comparePassword, encryptPassword } from "../../lib/bcrypt";
import { signToken } from "../../lib/jwt";
import { createUser, getUserByEmail } from "./user.model";

export async function createUserController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const hashedPassword = await encryptPassword(password);

  const userData: User = {
    username,
    email,
    hashed_password: hashedPassword,
    id: crypto.randomUUID(),
  };
  await createUser(userData);

  const accessToken = signToken(userData);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(Date.now() + 10 + 60 + 24),
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "Successfuly created user" });
}

export async function loginUserController(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    console.error("Error: Email and password is required");
    res.status(400).json({ message: "Email and password is required" });
  }

  const userData = await getUserByEmail(email);

  if (!userData) {
    res.status(404).json({ message: "Cannot find user" });
    return;
  }

  const hashedPassword = userData.hashed_password;

  const isAuthenticated = await comparePassword(password, hashedPassword);

  if (!isAuthenticated) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const accessToken = signToken(userData);

  res.cookie("accessToken", accessToken);
  res.status(200).json({ message: "Successfully logged in" });
}

export async function logoutUserController(req: Request, res: Response) {
  res.clearCookie("accessToken");
}
