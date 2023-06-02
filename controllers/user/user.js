import jwt from "jsonwebtoken";
import { User } from "../../models/user/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../../helperFunction/sendCookie.js";
import { REGSUCCESSFUL } from "../../constants/message.js";

export const getAllUsers = async (req, res) => {
  const Users = await User.find({});

  res.json({
    success: true,
    Users,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email Or Password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: `Welcome ${user.name}`,
      user,
      token,
    });
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  sendCookie(res, user, REGSUCCESSFUL, 201);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const userByID = await User.findById(id);
  res.json({
    success: true,
    userByID,
  });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
    });
};
