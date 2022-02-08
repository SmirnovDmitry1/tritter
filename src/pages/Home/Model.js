import { createPost, getAllPosts, createPostImage, dinamycGetAllPosts } from "../../api/api.js";
import moment from "moment";

class Model {
  constructor() {
    
    this.posts = []
    this.user = JSON.parse(localStorage.getItem("user")) || { isLogin: false };
    dinamycGetAllPosts(() => this.getPosts())
  }

  async getPosts() {
    this.posts = await getAllPosts();

    this._commit(this.posts);
  }

  bindPostChanged(callback) {
    this.onPostsChanged = callback;
  }

  _commit(posts) {
    this.onPostsChanged(posts, this.user);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  async addPost(data) {

    if (data.image) {
      await createPostImage(data)
    } else {
      await createPost(data)
    }

    this.posts = await getAllPosts()

    this._commit(this.posts)
  }
}

export default Model;
