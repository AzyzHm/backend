import { NotFoundError } from "../exception/app-error.js";
import Task from "../models/Task.js";

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTaskById(req, res) {

    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new NotFoundError("Task Not Found");
    }
    res.status(200).json({ data: task });
}

export async function createTask(req, res) {
  console.log("body", req.body);
  const newTask = await Task.create(req.body);
  res.status(201).json({ data: newTask });
}

export async function updateTask(req, res) {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!task) {
      throw new NotFoundError("Task Not Found");
    }
    res.status(200).json({ data: task });
  }

export async function deleteTask(req, res) {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      throw new NotFoundError("Task Not Found")
    }
    res.status(204).send();
  }
