import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();

const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;
const port = process.env.PORT;
mongoose
  .connect(dbConnectionString)
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("hello pallab");
});

app.listen(port, () => {
  console.log("server is running");
});
