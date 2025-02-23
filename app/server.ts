import express from "express";
import http from "http";
import dotenv from "dotenv";
import { router as userRouter } from "./modules/user/user.routes";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
