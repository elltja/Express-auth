import express from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from "./user.controller";
export const router = express.Router();

router.post("/create", createUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);
