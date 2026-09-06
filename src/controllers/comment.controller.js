import { CommentModel } from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";
import { CustomError } from "../utils/customError.js";

const paginate = (items, page, limit) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 10, 1);

  const start = (currentPage - 1) * pageSize;

  return {
    comments: items.slice(start, start + pageSize),

    pagination: {
      page: currentPage,
      limit: pageSize,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / pageSize),
    },
  };
};

export const getComments = (req, res, next) => {
  try {
    const post = PostModel.getPostById(req.params.id);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    const comments = CommentModel.getCommentsByPost(req.params.id);

    const result = paginate(comments, req.query.page, req.query.limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new CustomError(400, "Comment content is required");
    }

    const post = PostModel.getPostById(req.params.id);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    const comment = CommentModel.createComment(
      req.userId,
      req.params.id,
      content,
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new CustomError(400, "Comment content is required");
    }

    const existingComment = CommentModel.getCommentById(req.params.id);

    if (!existingComment) {
      throw new CustomError(404, "Comment not found");
    }

    if (existingComment.userId !== Number(req.userId)) {
      throw new CustomError(
        403,
        "You are not authorized to update this comment",
      );
    }

    const comment = CommentModel.updateComment(
      req.params.id,
      req.userId,
      content,
    );

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = (req, res, next) => {
  try {
    const existingComment = CommentModel.getCommentById(req.params.id);

    if (!existingComment) {
      throw new CustomError(404, "Comment not found");
    }

    if (existingComment.userId !== Number(req.userId)) {
      throw new CustomError(
        403,
        "You are not authorized to delete this comment",
      );
    }

    const comment = CommentModel.deleteComment(req.params.id, req.userId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};
