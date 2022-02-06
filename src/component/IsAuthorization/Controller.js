import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindUser(this.onUser)
    this.onUser(this.model.user)
  }

  onUser = user => {
    this.view.displayIsAuthorization(user)
  }
}

export const IsAuthorization = new Controller(new Model(), new View())