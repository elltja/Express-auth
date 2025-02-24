import { User } from "@prisma/client";
import { prisma } from "../../lib/db";

export async function createUser(userData: User) {
  await prisma.user.create({
    data: userData,
  });
}

export async function getUserByEmail(email: string) {
  const userData = await prisma.user.findUnique({
    where: { email },
  });
  return userData;
}
