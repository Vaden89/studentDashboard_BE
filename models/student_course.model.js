import mongoose from "mongoose";

const StudentCourseSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  grade: {
    type: String,
  },
});

export const StudentCourse = mongoose.model(
  "StudentCourse",
  StudentCourseSchema
);
