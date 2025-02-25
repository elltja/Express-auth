import nodemailer from "nodemailer";
import { getVerificationEmailTemplate } from "./templates";
import { Email_verification_token, User } from "@prisma/client";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.VERIFICATION_MAIL_ADDRESS,
    pass: process.env.VERIFICATION_MAIL_PASSWORD,
  },
});

export async function sendVerificationMail(
  userData: User,
  tokenData: Email_verification_token
) {
  const text = getVerificationEmailTemplate(
    userData.email,
    `/email/verify?token=${tokenData.token}`
  );

  try {
    const info = await transporter.sendMail({
      from: process.env.VERIFICATION_MAIL_ADDRESS,
      to: userData.email,
      subject: "Verify your email",
      text,
    });

    console.log("Email sent: ", info.response);
  } catch (err) {
    throw new Error("Error sending email:" + err);
  }
}
