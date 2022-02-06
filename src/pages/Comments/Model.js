import { createComment, getAllPosts, createCommentImage, dinamycGetAllPosts, getPost } from "../../api/api.js";
import moment from "moment";

class Model {
  constructor() {
    this.search = window.location.search
    this.id = this.search.slice(this.search.indexOf('=') + 1)
    this.posts = []
    this.user = JSON.parse(localStorage.getItem("user")) || { isLogin: false };
    dinamycGetAllPosts(() => this.getPosts())
  }

  async getPosts() {
    this.posts = await getPost(this.id);
    
    this._commit(this.posts);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(posts) {
    this.onTodoListChanged(posts, this.user);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  async addComment(data) {

    if (data.photo) {
      await createCommentImage({...data, id: this.id})
    } else {
      await createComment({...data, id: this.id})
    }

    this._commit(this.posts)
  }
}

export default Model;
