import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasks.controllers.js";

import {requireAuth, isAdmin} from "../middlewares/auth.js"

const router = Router();

router.get("/",requireAuth, isAdmin, getAllTasks);

router.get("/:id", getTaskById);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id" ,deleteTask);

export default router;
