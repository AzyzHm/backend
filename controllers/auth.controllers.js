import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ValidationError } from "../exception/app-error.js";

export const signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role || 'user'
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, role });
    res.status(201).json({ data: { id: newUser._id, email: newUser.email, role: newUser.role } });
  }

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new ValidationError("Identifiants invalides");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ValidationError("Identifiants invalides");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ data: { token } });
  }
