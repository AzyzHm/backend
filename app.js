import express from "express";

import cors from "cors";

import taskRouter from "./routes/tasks.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/tasks", taskRouter);

export default app;
