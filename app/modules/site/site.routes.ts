import exress from "express";

export const router = exress.Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});
