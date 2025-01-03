import express from "express";
import { Course } from "../models/course.model.js";
import verifyToken from "../middleware/verifyToken.js";
import { StudentCourse } from "../models/student_course.model.js";

const router = express.Router();

//get assigned courses
router.get("/courses", verifyToken, async (req, res) => {
  const user = req.user.user;
  if (user.role !== "LECTURER") {
    res.status(403).json({
      error: "Only lecturers can view their assigned courses",
    });
  }

  try {
    const courses = await Course.find({ lecturer: user.id });
    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//get students registered under assigned course
router.get("/course-students/:id", verifyToken, async (req, res) => {
  const courseID = req.params;
  const userData = req.user.user;
  if (userData.role !== "LECTURER") {
    res.status(403).json({ error: "Only lecturers can view students " });
  }

  try {
    const course = Course.findByID(courseID).populate("lecturer");
    if (!course) {
      return res.status(404).json({ error: "Course Could not be found" });
    }

    if (course.lecturer.toString() !== userData.id) {
      return res
        .status(403)
        .json({ error: "You are not assigned to this course" });
    }

    const students = await StudentCourse.find({ course: courseID }).populate(
      "student"
    );
    json.status(200).json({
      message: "Students found successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//grade student

export default router;
