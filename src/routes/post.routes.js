import express from "express";

import {
  getAllPosts,
  getUserPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

// GET /api/posts/all
router.get("/all", getAllPosts);

// GET /api/posts
// Gets posts belonging to authenticated user
router.get("/", getUserPosts);

// GET /api/posts/:id
router.get("/:id", getPostById);

// POST /api/posts
router.post("/", upload.single("media"), createPost);

// PUT /api/posts/:id
router.put("/:id", upload.single("media"), updatePost);

// DELETE /api/posts/:id
router.delete("/:id", deletePost);

export default router;
