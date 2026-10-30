import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ForbiddenError, UnauthenticatedError } from "../exception/app-error.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Non authentifié")
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Utilisateur introuvable" });
    }
    req.userId = decoded.id;
    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    throw new ForbiddenError("Pas d'accés Administrateur")
  }
  next();
};
