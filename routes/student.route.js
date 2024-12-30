import express from "express";
import Course from "../models/course.model.js";
import StudentCourse from "../models/student_course.model.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//get user courses

//register for courses
router.post("/register_courses", verifyToken, async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (req.user.role !== "STUDENT") {
    return res
      .status(403)
      .json({ error: "Only students can register for courses" });
  }

  try {
    for (const courseId of courses) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: `Course ${courseId} not found` });
      }

      const existingRegistration = await StudentCourse.findOne({
        student: userId,
        course: courseId,
      });

      if (existingRegistration) {
        return res
          .status(400)
          .json({ error: `Already registered for course ${courseId}` });
      }

      const studentCourse = new StudentCourse({
        student: userId,
        course: courseId,
      });
      await studentCourse.save();
    }

    res.status(201).json({ message: "Courses registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//view grades
