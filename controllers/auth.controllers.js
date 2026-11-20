import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ValidationError } from "../exception/app-error.js";

export const signup = async (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Register a user'
    #swagger.description = 'Creates a user with a hashed password.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignupInput" }
        }
      }
    }
    #swagger.responses[201] = {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  email: { type: "string", format: "email" },
                  role: { type: "string", enum: ["user", "admin"] }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "Invalid registration input",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/AuthError" }
        }
      }
    }
  */

  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role || "user";
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, role });

  res.status(201).json({
    data: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const login = async (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Authenticate a user'
    #swagger.description = 'Validates credentials and returns a signed JWT.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/LoginInput" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "Login successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "Invalid credentials",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/AuthError" }
        }
      }
    }
  */

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ValidationError("Identifiants invalides");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ValidationError("Identifiants invalides");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ data: { token } });
};
