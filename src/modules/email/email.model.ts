import { Email_verification_token } from "@prisma/client";
import { prisma } from "lib/db";

export async function addEmailVerificationToken(
  tokenData: Email_verification_token
) {
  try {
    await prisma.email_verification_token.create({
      data: tokenData,
    });
  } catch (err) {
    throw new Error(
      "Error adding email verification token to the database: " + err
    );
  }
}
