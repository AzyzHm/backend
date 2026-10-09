import { Router } from "express";
import task from "../models/task";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/tasks.controllers";

const router = Router();

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
