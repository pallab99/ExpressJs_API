import { Task } from "../../models/task/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  const task = Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task Created SuccessFully",
    task,
  });
};

export const getMyTask = async (req, res, next) => {
  const userId = req.user._id;

  const task = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    task,
  });
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    message: "task updated",
    task,
  });
};

export const deleteTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);
  
    await task.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "task deleted",
      task
    });
  };
