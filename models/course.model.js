import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include a course name"],
  },

  course_code: {
    type: String,
    required: [true, "Please include a course code"],
  },

  level: {
    type: Number,
    required: [true, "Please include the level the course belongs to"],
  },

  //This is a reference to the lecturer taking the course
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Course = mongoose.model("Course", CourseSchema);
