import { Email_verification_token, User } from "@prisma/client";
import { addEmailVerificationToken } from "./email.model";
import { sendVerificationMail } from "lib/mail/nodemailer";

export async function verifyEmail(userData: User) {
  const verificationToken = crypto.randomUUID();

  const tokenData: Email_verification_token = {
    id: crypto.randomUUID(),
    user_id: userData.id,
    token: verificationToken,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24),
  };
  try {
    await addEmailVerificationToken(tokenData);
    await sendVerificationMail(userData, tokenData);
  } catch (err) {
    console.error(err);
  }
}
