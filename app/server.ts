import express from "express";
import http from "http";
import dotenv from "dotenv";
import { router as userRouter } from "./modules/user/user.routes";
import { protect } from "./lib/middleware";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get("/", protect, (req, res) => {
  res.json({ message: "Hello world" });
});

app.use("/user", userRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
