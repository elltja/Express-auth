import express from "express";
import { router as userRouter } from "../../modules/user/user.routes";
import { router as emailRouter } from "../../modules/email/email.routes";
export const router = express.Router();

router.use("/users", userRouter);
router.use("/email", emailRouter);
