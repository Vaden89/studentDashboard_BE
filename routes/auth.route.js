import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!username.length > 3)
    return res
      .status(400)
      .json({ error: "Username must be minimum of 3 characters" });

  if (!password.length > 8)
    return res
      .status(400)
      .json({ error: "Password must be minimum of 8 characters" });

  if (!user) {
    try {
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      res.status(400).json({ error: "Error registering user" });
    }
  } else {
    res.status(400).json({ error: "User Already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      status: "success",
      accessToken: token,
      data: {
        user: userData,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
