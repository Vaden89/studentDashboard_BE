import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = await User.findOne({ school_ID: req.body.school_ID });
  const { password } = req.body;

  if (!password.length > 8)
    return res
      .status(400)
      .json({ error: "Password must be minimum of 8 characters" });

  if (!user) {
    try {
      const user = new User(req.body);
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
  const { school_ID, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ school_ID }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
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

router.get("/get-user", async (req, res) => {
  const userID = req.user.id;

  try {
    const user = await User.findById(userID);
    res.send(201).json({
      message: "Successfully Retrieved User Information",
      data: user,
    });
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

export default router;
