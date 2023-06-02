import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../../controllers/user/user.js";
const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default router;
