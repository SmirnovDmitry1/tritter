import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindTodoListChanged(this.onTodoListChanged)
    this.view.createComment(this.handleAddPost)
    this.onTodoListChanged(this.model.posts, this.model.user)

    
  }

  unMount = () => {
    document.querySelector('#home').remove()
  }

  onTodoListChanged = (posts, user) => {
    this.view.displayPost(posts, user)
  }

  handleAddPost = data => {
    this.model.addComment(data)
  }
}

export const Comments = () => new Controller(new Model(), new View())