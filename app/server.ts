import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
app.get("/testing", (req, res) => {
  res.send("Testing testing");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
