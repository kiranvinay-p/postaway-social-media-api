import express from "express";

import {
  getLikes,
  toggleLike,
  removeLike,
} from "../controllers/like.controller.js";

const router = express.Router();

// GET /api/likes/:postid
router.get("/:postid", getLikes);

// GET /api/likes/toggle/:postid
router.get("/toggle/:postid", toggleLike);

// DELETE /api/likes/:postid
router.delete("/:postid", removeLike);

export default router;
