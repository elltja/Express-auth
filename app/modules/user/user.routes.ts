import express from "express";
import { createUserController } from "./user.controller";
export const router = express.Router();

router.post("/create", createUserController);
