import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Please include your fullname"],
  },
  email: {
    type: String,
    required: [true, "Please include your email"],
  },
  password: {
    type: String,
    required: [true, "Please include a password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["STUDENT", "LECTURER", "COURSE_ADVISOR"],
    required: true,
  },
  school_ID: {
    type: String,
    required: [true, "Please include the staff ID"],
  },
  //For only students only

  level: {
    type: Number,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
