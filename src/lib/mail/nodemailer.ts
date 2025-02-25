import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.VERIFICATION_MAIL_ADDRESS,
    pass: process.env.VERIFICATION_MAIL_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, text: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.VERIFICATION_MAIL_ADDRESS,
      to,
      subject,
      text,
    });

    console.log("Email sent: ", info.response);
  } catch (err) {
    throw new Error("Error sending email:" + err);
  }
}
