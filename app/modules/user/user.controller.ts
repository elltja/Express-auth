import { Request, Response } from "express";
import { prisma } from "../../lib/db";
import { User } from "@prisma/client";
import { comparePassword, encryptPassword } from "../../lib/bcrypt";
import { signToken } from "../../lib/jwt";

export async function createUserController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const hashedPassword = await encryptPassword(password);

  const userData: User = {
    username,
    email,
    hashed_password: hashedPassword,
    id: crypto.randomUUID(),
  };

  await prisma.user.create({
    data: userData,
  });

  const accessToken = signToken(userData);

  res.cookie("accessToken", accessToken);
  res.status(200).json({ message: "Successfuly created user" });
}

export async function loginUserController(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  const user = await prisma.user.findUnique({
    where: { email },
    select: { hashed_password: true },
  });

  if (!user) {
    res.status(404).json({ message: "Cannot find user" });
    return;
  }

  const hashedPassword = user.hashed_password;

  const isAuthenticated = await comparePassword(password, hashedPassword);

  if (!isAuthenticated) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  res.status(200).json({ message: "Successfully logged in" });
}
