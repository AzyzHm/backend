import Task from "../models/Task.js"

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
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ data: task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTask(req, res) {
  console.log("body", req.body);
  const newTask = await Task.create(req.body);
  res.status(201).json({ data: newTask });
}

export async function updateTask(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ data: task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
