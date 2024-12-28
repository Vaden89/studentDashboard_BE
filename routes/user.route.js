import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

//protected routes
router.get("/greet", verifyToken, (req, res) => {
  res.status(200).send("Hello");
});

export default router;
