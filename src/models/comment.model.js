let comments = [];
let nextCommentId = 1;

export class CommentModel {
  static createComment(userId, postId, content) {
    const comment = {
      id: nextCommentId++,
      userId: Number(userId),
      postId: Number(postId),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    comments.push(comment);

    return comment;
  }

  static getCommentsByPost(postId) {
    return comments.filter((comment) => comment.postId === Number(postId));
  }

  static getCommentById(commentId) {
    return comments.find((comment) => comment.id === Number(commentId));
  }

  static updateComment(commentId, userId, content) {
    const comment = this.getCommentById(commentId);

    if (!comment || comment.userId !== Number(userId)) {
      return null;
    }

    comment.content = content;
    comment.updatedAt = new Date().toISOString();

    return comment;
  }

  static deleteComment(commentId, userId) {
    const index = comments.findIndex(
      (comment) =>
        comment.id === Number(commentId) && comment.userId === Number(userId),
    );

    if (index === -1) {
      return null;
    }

    return comments.splice(index, 1)[0];
  }

  static deleteCommentsForPost(postId) {
    comments = comments.filter((comment) => comment.postId !== Number(postId));
  }
}
