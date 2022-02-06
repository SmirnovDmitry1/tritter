import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.onRegistration()
    this.view.bindLogin(this.handleLogin)
  }

  unMount = () => {
    document.querySelector('#login').remove()
  }

  onRegistration = () => {
    this.view.displayRegistration()
  }

  handleLogin = data => {
    const res = this.model.loginUser(data)

    return res
  }
}

export const Login = () => new Controller(new Model(), new View())