import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { Course } from "../models/course.model.js";
import { StudentCourse } from "../models/student_course.model.js";

const router = express.Router();

//get assigned courses

//get students registered under assigned course
router.get("/get-student/:id", verifyToken, async (req, res) => {
  const courseID = req.params;
  if (req.user.role !== "LECTURER") {
    res.status(403).json({ error: "Only lecturers can view students " });
  }

  try {
    const course = Course.findByID(courseID).populate("lecturer");
    if (!course) {
      return res.status(404).json({ error: "Course Could not be found" });
    }

    if (course.lecturer.toString() !== req.user.id) {
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
