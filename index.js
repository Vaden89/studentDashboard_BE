import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import studentRouter from "./routes/student.route.js";
import lecturerRouter from "./routes/lecturer.route.js";
import HODRoute from "./routes/HOD.route.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/lecturer", lecturerRouter);
app.use("/hod", HODRoute);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT} `);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
