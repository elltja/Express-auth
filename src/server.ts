import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protect } from "./lib/middleware";
import { router as apiRouter } from "./routes/v1/api.routes";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "*" }));
}

app.get("/protected", protect, (req, res) => {
  res.send("Protected route");
});

app.use("/api/v1", apiRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
