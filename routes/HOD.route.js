import express from "express";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import verifyToken from "../middleware/verifyToken.js";
import { checkSchema, validationResult } from "express-validator";
import { createCourseValidationSchema } from "../utils/validationSchemas.mjs";

const router = express.Router();

//get all students
router.get("/students", verifyToken, async (req, res) => {
  const userData = req.user.user;
  if (userData.role !== "HOD") {
    return res
      .status(403)
      .json({ error: "Only course advisor can view all students" });
  }

  try {
    const students = await User.find({
      role: "STUDENT",
    });
    res.status(200).json({ message: "", data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create course
router.post(
  "/create-course",
  verifyToken,
  checkSchema(createCourseValidationSchema),
  async (req, res) => {
    const userData = req.user.user;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      }));
      return res
        .status(400)
        .json({ error: "Invalid data", errors: formattedErrors });
    }

    if (userData.role !== "HOD") {
      return res
        .status(403)
        .json({ error: "Only Head of Departments can create a course" });
    }

    const { name, course_code, lecturer, level } = req.body;

    try {
      const isNameMatch = await Course.findOne({ name });
      const isCodeMatch = await Course.findOne({ course_code });
      if (isNameMatch) {
        return res
          .status(400)
          .json({ error: "A course with this name already exists" });
      } else if (isCodeMatch) {
        return res
          .status(400)
          .json({ error: "A course with this code already exists" });
      }

      const course = new Course({
        name,
        course_code,
        lecturer,
        level,
      });
      await course.save();

      res
        .status(200)
        .json({ message: "The course has been created", data: course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
