import { Email_verification_token, User } from "@prisma/client";
import { addEmailVerificationToken } from "./email.model";
import { sendMail } from "lib/mail/nodemailer";
import { getVerificationEmailTemplate } from "./email.templates";

export async function sendVerificationMail(userData: User) {
  const verificationToken = crypto.randomUUID();

  const tokenData: Email_verification_token = {
    id: crypto.randomUUID(),
    user_id: userData.id,
    token: verificationToken,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24),
  };
  const text = getVerificationEmailTemplate(
    userData.email,
    `/email/verify?token=${tokenData.token}`
  );
  const subject = "Verify you email";
  try {
    await addEmailVerificationToken(tokenData);
    await sendMail(userData.email, subject, text);
  } catch (err) {
    console.error(err);
  }
}
