import { User } from "../../models/user/user.js";

export const getAllUsers = async (req, res) => {
  const Users = await User.find({});

  res.json({
    success: true,
    Users,
  });
};

export const createNewUser = async (req, res) => {
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
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const userByID = await User.findById(id);
  res.json({
    success: true,
    userByID,
  });
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const userByID = await User.findById(id);
  res.json({
    success: true,
    userByID,
    message:"user details updated"
  });
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const userByID = await User.findById(id);
  res.json({
    success: true,
    userByID,
    message:"user deleted"
  });
};
