import nodemailer from "nodemailer";
import { getVerificationEmailTemplate } from "./templates";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.VERIFICATION_MAIL_ADDRESS,
    pass: process.env.VERIFICATION_MAIL_PASSWORD,
  },
});

export async function sendVerificationMail(to: string) {
  try {
    const text = getVerificationEmailTemplate(to, ""); // TODO: Add verification tokens module
    const info = await transporter.sendMail({
      from: process.env.VERIFICATION_MAIL_ADDRESS,
      to,
      subject: "Verify your email",
      text,
    });

    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
