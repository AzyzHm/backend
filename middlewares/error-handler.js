// middlewares/error-handler.js
import mongoose from "mongoose";
import { AppError, NotFoundError, ValidationError } from "../exception/app-error.js";

export function notFoundHandler(req, res, next) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  let error = err;

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = new ValidationError("Invalid input", details);
  }
  else if (err instanceof mongoose.Error.CastError) {
    error = new ValidationError(`Invalid value for ${err.path}`);
  }
  else if (err.type === "entity.parse.failed") {
    error = new ValidationError("Malformed JSON body");
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Internal Server Error" },
  });
}