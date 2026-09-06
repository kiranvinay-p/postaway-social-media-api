import jwt from "jsonwebtoken";

import { UserModel } from "../models/user.model.js";
import { CustomError } from "../utils/customError.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "postaway_secret_key", {
    expiresIn: "1d",
  });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new CustomError(400, "Name, email and password are required");
    }

    if (password.length < 6) {
      throw new CustomError(400, "Password must be at least 6 characters long");
    }

    const existingUser = UserModel.findByEmail(email);

    if (existingUser) {
      throw new CustomError(409, "User already exists");
    }

    const user = await UserModel.addUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(400, "Email and password are required");
    }

    const user = await UserModel.confirmLogin(email, password);

    if (!user) {
      throw new CustomError(401, "Invalid email or password");
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
