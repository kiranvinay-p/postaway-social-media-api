import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new CustomError(401, "Authentication token is required");
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new CustomError(401, "Invalid authorization format");
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "postaway_secret_key",
    );

    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
      return;
    }

    if (error.name === "TokenExpiredError") {
      next(new CustomError(401, "Token has expired"));
      return;
    }

    if (error.name === "JsonWebTokenError") {
      next(new CustomError(401, "Invalid token"));
      return;
    }

    next(error);
  }
};
