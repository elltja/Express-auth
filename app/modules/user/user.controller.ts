import { Request, Response } from "express";
import { prisma } from "../../lib/db";
import { User } from "@prisma/client";
import { encryptPassword } from "../../lib/bcrypt";
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
