import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  email: String,
  password: String,
});

export const User = mongoose.model("User", schema);
