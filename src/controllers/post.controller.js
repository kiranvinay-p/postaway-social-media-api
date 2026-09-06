import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";
import { CommentModel } from "../models/comment.model.js";
import { LikeModel } from "../models/like.model.js";
import { CustomError } from "../utils/customError.js";

const paginate = (items, page, limit) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 10, 1);

  const start = (currentPage - 1) * pageSize;

  return {
    data: items.slice(start, start + pageSize),
    pagination: {
      page: currentPage,
      limit: pageSize,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / pageSize),
    },
  };
};

export const getAllPosts = (req, res, next) => {
  try {
    let posts;

    const { caption, sort, page, limit } = req.query;

    if (caption) {
      posts = PostModel.filterPosts(caption);
    } else {
      posts = PostModel.getAllPosts();
    }

    if (sort === "date") {
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sort === "engagement") {
      posts.sort((a, b) => {
        const engagementA =
          LikeModel.getLikesByPost(a.id).length +
          CommentModel.getCommentsByPost(a.id).length;

        const engagementB =
          LikeModel.getLikesByPost(b.id).length +
          CommentModel.getCommentsByPost(b.id).length;

        return engagementB - engagementA;
      });
    }

    const result = paginate(posts, page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = (req, res, next) => {
  try {
    const posts = PostModel.getUserPosts(req.userId);

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = (req, res, next) => {
  try {
    const post = PostModel.getPostById(req.params.id);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    const author = UserModel.findById(post.userId);

    res.status(200).json({
      success: true,
      post: {
        ...post,
        author: author
          ? {
              id: author.id,
              name: author.name,
              email: author.email,
            }
          : null,
        likes: LikeModel.getLikesByPost(post.id),
        comments: CommentModel.getCommentsByPost(post.id),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = (req, res, next) => {
  try {
    const { caption, status } = req.body;

    if (!caption && !req.file) {
      throw new CustomError(400, "Post must contain a caption or media");
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const post = PostModel.createPost(req.userId, caption, imageUrl);

    if (status === "draft") {
      post.status = "draft";
    }

    if (status === "archived") {
      post.status = "archived";
    }

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = (req, res, next) => {
  try {
    const existingPost = PostModel.getPostById(req.params.id);

    if (!existingPost) {
      throw new CustomError(404, "Post not found");
    }

    if (existingPost.userId !== Number(req.userId)) {
      throw new CustomError(403, "You are not authorized to update this post");
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const post = PostModel.updatePost(req.params.id, req.userId, {
      caption: req.body.caption,
      imageUrl,
      status: req.body.status,
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = (req, res, next) => {
  try {
    const post = PostModel.getPostById(req.params.id);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    if (post.userId !== Number(req.userId)) {
      throw new CustomError(403, "You are not authorized to delete this post");
    }

    const deletedPost = PostModel.deletePost(req.params.id, req.userId);

    LikeModel.deleteLikesForPost(req.params.id);

    CommentModel.deleteCommentsForPost(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
