import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindUser(this.onUser)
    this.onUser(this.model.user)
    this.view.bindLogOut(this.handleLogOut)
  }

  onUser = user => {
    this.view.displayLinkUser(user)
  }

  handleLogOut = () => {
    this.model.logOutUser()
  }
}

export const SideMenu = new Controller(new Model(), new View())