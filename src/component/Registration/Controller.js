import View from './View.js'
import Model from './Model.js'

import './index.scss'


class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.onRegistration()
    this.view.bindRegistration(this.handleRegistration)
  }

  unMount = () => {
    document.querySelector('#registration').remove()
  }

  onRegistration = () => {
    this.view.displayRegistration()
  }

  handleRegistration = data => {
    this.model.registrationUser(data)
  }
}

export const Registration = () => new Controller(new Model(), new View())