import { LikeModel } from "../models/like.model.js";
import { PostModel } from "../models/post.model.js";
import { CustomError } from "../utils/customError.js";

export const getLikes = (req, res, next) => {
  try {
    const post = PostModel.getPostById(req.params.postid);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    const likes = LikeModel.getLikesByPost(req.params.postid);

    res.status(200).json({
      success: true,
      likes,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = (req, res, next) => {
  try {
    const post = PostModel.getPostById(req.params.postid);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    const result = LikeModel.toggleLike(req.userId, req.params.postid);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeLike = (req, res, next) => {
  try {
    const post = PostModel.getPostById(req.params.postid);

    if (!post) {
      throw new CustomError(404, "Post not found");
    }

    const like = LikeModel.removeLike(req.userId, req.params.postid);

    if (!like) {
      throw new CustomError(404, "Like not found");
    }

    res.status(200).json({
      success: true,
      message: "Like removed successfully",
    });
  } catch (error) {
    next(error);
  }
};
