import { createPost, createPostImage, getProfilePosts, getProfile, dinamycGetAllPosts } from "../../api/api.js";


class Model {
  constructor() {
    this.search = window.location.search
    this.id = this.search.slice(this.search.indexOf('=') + 1)
    
    this.posts = []
    this.user = JSON.parse(localStorage.getItem("user")) || { isLogin: false };
    this.profile = {}
    dinamycGetAllPosts(() => this.getPosts())
  }

  async getPosts() {
    this.posts = await getProfilePosts(this.id);
    this.profile = await getProfile(this.id);
    this._commit(this.posts, this.profile);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(posts, profile) {
    this.onTodoListChanged(posts, this.user, profile);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  async addPost(data) {

    if (data.image) {
      await createPostImage(data)
    } else {
      await createPost(data)
    }

    this._commit(this.posts)
  }
}

export default Model;
