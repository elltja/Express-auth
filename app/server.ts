import express from "express";
import http from "http";
import dotenv from "dotenv";
import { router as userRouter } from "./modules/user/user.routes";
import { router as siteRouter } from "./modules/site/site.routes";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.json());

app.use("/", siteRouter);

app.use("api/user", userRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
