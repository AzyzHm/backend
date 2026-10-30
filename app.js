import express from "express";

import cors from "cors";

import taskRouter from "./routes/tasks.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(cors());

app.use(express.json()); // to double check

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(errorHandler)
app.use(notFoundHandler)
app.use("/api/tasks",taskRouter);
app.use("/api/auth", authRouter);

export default app;
