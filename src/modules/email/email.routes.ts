import express from "express";
import { prisma } from "../../lib/db";

export const router = express.Router();

router.get("/verify", async (req, res) => {
  const { token } = req.query as { token: string };

  if (!token) {
    res.status(400).json({ message: "Token is required" });
    return;
  }

  try {
    const tokenData = await prisma.email_verification_token.findUnique({
      where: { token },
    });

    if (!tokenData) {
      res.status(404).json({ message: "Token not found" });
      return;
    }

    const now = new Date();

    if (tokenData.expires_at.getTime() < now.getTime()) {
      res.status(403).json({ message: "Token expired" });
      return;
    }

    await prisma.user.update({
      where: { id: tokenData.user_id },
      data: { email_verified: true },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
