import express, { json } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user/user.js";
import taskRouter from './routes/task/task.js'
export const app = express();

app.use(json());
app.use(cookieParser());


app.get("/", (_, res) => {
  res.send("hello pallab");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task",taskRouter)


