let likes = [];
let nextLikeId = 1;

export class LikeModel {
  static findLike(userId, postId) {
    return likes.find(
      (like) =>
        like.userId === Number(userId) && like.postId === Number(postId),
    );
  }

  static addLike(userId, postId) {
    const existingLike = this.findLike(userId, postId);

    if (existingLike) {
      return existingLike;
    }

    const like = {
      id: nextLikeId++,
      userId: Number(userId),
      postId: Number(postId),
      createdAt: new Date().toISOString(),
    };

    likes.push(like);

    return like;
  }

  static removeLike(userId, postId) {
    const index = likes.findIndex(
      (like) =>
        like.userId === Number(userId) && like.postId === Number(postId),
    );

    if (index === -1) {
      return null;
    }

    return likes.splice(index, 1)[0];
  }

  static toggleLike(userId, postId) {
    const existingLike = this.findLike(userId, postId);

    if (existingLike) {
      this.removeLike(userId, postId);

      return {
        liked: false,
        message: "Post unliked successfully",
      };
    }

    this.addLike(userId, postId);

    return {
      liked: true,
      message: "Post liked successfully",
    };
  }

  static getLikesByPost(postId) {
    return likes.filter((like) => like.postId === Number(postId));
  }

  static deleteLikesForPost(postId) {
    likes = likes.filter((like) => like.postId !== Number(postId));
  }
}
