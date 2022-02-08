import moment from 'moment'

class View {
  constructor() {
    this.app = this.getElement('#root')
  }

  createElement(tag, className) {
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
  }

  getElement(selector) {
    const element = document.querySelector(selector)

    return element
  }

  displayIsAuthorization(user) {

    if (!user.isLogin) {
      
      const div = this.createElement('div', 'IsAuthorization')
      div.id = 'auth'
      const content = this.createElement('div', 'content')
      const buttons = this.createElement('div', 'buttons')

      const title = this.createElement('h1')
      title.textContent = 'Будьте в курсе событий'

      const text = this.createElement('span')
      text.textContent = 'Пользователи Триттера узнают новости первыми.'

      const login = this.createElement('a', 'login')
      login.textContent = 'Войти'
      login.href='/#login'

      const registration = this.createElement('a', 'registration')
      registration.textContent = 'Регистрация'
      registration.href='/#registration'


      content.append(title, text)
      buttons.append(login, registration)
      div.append(content, buttons)

      this.app.append(div)
    }
    
  }

}

export default View