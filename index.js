import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/auth", authRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT} `);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
