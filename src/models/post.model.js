let posts = [];
let nextPostId = 1;

export class PostModel {
  static createPost(userId, caption, imageUrl = null) {
    const post = {
      id: nextPostId++,
      userId: Number(userId),
      caption: caption || "",
      imageUrl,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(post);

    return post;
  }

  static getAllPosts() {
    return posts.filter((post) => post.status === "published");
  }

  static getAllPostsIncludingArchived() {
    return posts;
  }

  static getUserPosts(userId) {
    return posts.filter((post) => post.userId === Number(userId));
  }

  static getPostById(id) {
    return posts.find((post) => post.id === Number(id));
  }

  static updatePost(id, userId, data) {
    const post = this.getPostById(id);

    if (!post || post.userId !== Number(userId)) {
      return null;
    }

    if (data.caption !== undefined) {
      post.caption = data.caption;
    }

    if (data.imageUrl !== undefined) {
      post.imageUrl = data.imageUrl;
    }

    if (data.status !== undefined) {
      post.status = data.status;
    }

    post.updatedAt = new Date().toISOString();

    return post;
  }

  static deletePost(id, userId) {
    const index = posts.findIndex(
      (post) => post.id === Number(id) && post.userId === Number(userId),
    );

    if (index === -1) {
      return null;
    }

    const deletedPost = posts[index];

    posts.splice(index, 1);

    return deletedPost;
  }

  static filterPosts(caption) {
    const search = caption.toLowerCase();

    return this.getAllPosts().filter((post) =>
      post.caption.toLowerCase().includes(search),
    );
  }

  static sortPosts(sortBy) {
    const result = [...this.getAllPosts()];

    if (sortBy === "date") {
      return result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    return result;
  }
}
