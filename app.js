import express, { json } from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();
const { Schema } = mongoose;

app.use(json());
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

const schema = new Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", schema);

app.get("/", (req, res) => {
  res.send("hello pallab");
});

app.get("/user/all", async (req, res) => {
  const Users = await User.find({});

  res.json({
    success: true,
    Users,
  });
});

app.post("/user/new", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "registered successfully",
    newUser,
  });
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const userByID = await User.findById(id);
  res.json({
    success: true,
    userByID,
  });
});

app.listen(port, () => {
  console.log("server is running");
});
