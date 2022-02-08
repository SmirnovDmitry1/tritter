import { createComment, createCommentImage, dinamycGetAllPosts, getPost } from "../../api/api.js";

class Model {
  constructor() {
    this.search = window.location.search
    this.id = this.search.slice(this.search.indexOf('=') + 1)
    this.post = []
    this.user = JSON.parse(localStorage.getItem("user")) || { isLogin: false };
    dinamycGetAllPosts(() => this.getPosts())
  }

  async getPosts() {
    this.post = await getPost(this.id);
    
    this._commit(this.post);
  }

  bindCommentsChanged(callback) {
    this.onCommentsChanged = callback;
  }

  _commit(post) {
    this.onCommentsChanged(post, this.user);
    localStorage.setItem("post", JSON.stringify(post));
  }

  async addComment(data) {

    if (data.photo) {
      await createCommentImage({...data, id: this.id})
    } else {
      await createComment({...data, id: this.id})
    }

    this._commit(this.post)
  }
}

export default Model;
