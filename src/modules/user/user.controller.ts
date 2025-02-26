import { Request, Response } from "express";
import { User } from "@prisma/client";
import { comparePassword, encryptPassword } from "../../lib/bcrypt";
import { signRefreshToken, signToken } from "../../lib/jwt";
import { createUser, getUserByEmail } from "./user.model";
import { sendVerificationMail } from "../email/email.service";

export async function createUserController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await encryptPassword(password);

    const userData: User = {
      username,
      email,
      hashed_password: hashedPassword,
      id: crypto.randomUUID(),
      email_verified: false,
      created_at: new Date(),
    };
    const result = await createUser(userData);

    if (!result) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }

    const accessToken = signToken(userData);
    const refreshToken = signRefreshToken(userData);

    sendVerificationMail(userData);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Successfully created user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
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
  res.status(200).json({ message: "Successfully logged out" });
}
