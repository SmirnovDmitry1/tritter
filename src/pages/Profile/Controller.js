import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindTodoListChanged(this.onPostsChanged)
    this.onPostsChanged(this.model.posts, this.model.user, this.model.profile)
    this.view.createPost(this.handleAddPost)
    
  }

  unMount = () => {
    document.querySelector('#profile').remove()
  }

  onPostsChanged = (posts, user, profile) => {
    this.view.displayPost(posts, user, profile)
  }

  handleAddPost = data => {
    this.model.addPost(data)
  }
}

export const Profile = () => new Controller(new Model(), new View())