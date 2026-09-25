import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from './data.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.get("/api/tasks", (req, res) => {
    const tasks = getAllTasks();
    res.status(200).json({data: tasks});
});

app.get("/api/tasks/:id", (req, res) => {
    console.log("id :", req.params.id);
    const tasks = getTaskById(req.params.id);
    res.status(200).json({data: tasks});
});

app.post("/api/tasks", (req, res) => {
    console.log("body", req.body);
    const newTask = createTask(req.body);
    res.status(201).json({data: newTask});
});

app.patch("/api/tasks/:id", (req, res) => {
    const task = updateTask(req.params.id, req.body)
    res.status(200).json({data: task});
});

app.delete("/api/tasks/:id", (req, res) => {
    const success = deleteTask(req.params.id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

export default app;