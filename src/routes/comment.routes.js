import express from "express";

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// GET /api/comments/:id
router.get("/:id", getComments);

// POST /api/comments/:id
router.post("/:id", createComment);

// PUT /api/comments/:id
router.put("/:id", updateComment);

// DELETE /api/comments/:id
router.delete("/:id", deleteComment);

export default router;
