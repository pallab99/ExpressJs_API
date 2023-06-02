import express, { json } from "express";
import userRouter from "./routes/user/user.js";
import { connectDB } from "./configs/database/databaseConnection.js";
export const app = express();

app.use(json());


app.get("/", (_, res) => {
  res.send("hello pallab");
});

app.use("/api/v1/user", userRouter);


