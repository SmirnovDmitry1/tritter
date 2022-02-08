import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindCommentsChanged(this.onCommentsChanged)
    this.view.createComment(this.handleAddPost)
    this.onCommentsChanged(this.model.posts, this.model.user)

    
  }

  unMount = () => {
    document.querySelector('#home').remove()
  }

  onCommentsChanged = (posts, user) => {
    this.view.displayPost(posts, user)
  }

  handleAddPost = data => {
    this.model.addComment(data)
  }
}

export const Comments = () => new Controller(new Model(), new View())