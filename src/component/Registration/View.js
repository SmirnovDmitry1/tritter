import Logo from '../../assets/tritter.png'
import Close from '../../assets/close.png'

class View {
  constructor() {
    this.app = this.getElement('#root')
    this.shroud = this.createElement('div', 'shroud')
    this.shroud.id = 'registration'

    this.app.append(this.shroud)

    this.data = {
      firstName: '',
      lastName: '',
      email: '',
      login: '',
      password: '',
    }
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

  displayRegistration() {
    
    this.shroud.addEventListener('click', event => {
      if (event.target.className === 'shroud') {
        window.location.hash = ''
      }
    })

    const block = this.createElement('div', 'registration')

    const head = this.createElement('div', 'head')

    const iconClose = this.createElement('a', 'close')
    iconClose.href = '/'
    iconClose.textContent = '+'

    const iconLogo = this.createElement('img', 'logo')
    iconLogo.src = Logo

    const content = this.createElement('div', 'content')
    
    const title = this.createElement('span', 'title')
    title.textContent = 'Создайте учетную запись'

    const firstName = this.createElement('input', 'input')
    firstName.type = 'input'
    firstName.placeholder = 'Имя'
    firstName.value = this.data.firstName

    firstName.addEventListener('input', (e) => {
      this.data.firstName = e.target.value
    })

    const lastName = this.createElement('input', 'input')
    lastName.type = 'input'
    lastName.placeholder = 'Фамилия'
    lastName.value = this.data.lastName

    lastName.addEventListener('input', (e) => {
      this.data.lastName = e.target.value
    })

    const email = this.createElement('input', 'input')
    email.type = 'input'
    email.placeholder = 'Электронная почта'
    email.value = this.data.email

    email.addEventListener('input', (e) => {
      this.data.email = e.target.value
    })

    const login = this.createElement('input', 'input')
    login.type = 'input'
    login.placeholder = 'Логин'
    login.value = this.data.login

    login.addEventListener('input', (e) => {
      this.data.login = e.target.value
    })

    const password = this.createElement('input', 'input')
    password.type = 'password'
    password.placeholder = 'Пароль'
    password.value = this.data.password

    password.addEventListener('input', (e) => {
      this.data.password = e.target.value
    })

    const button = this.createElement('button')
    button.id = 'reg'
    button.textContent = 'Зарегестрироваться'

    head.append(iconClose, iconLogo)
    content.append(title, firstName, lastName, email, login, password)
    block.append(head, content, button)

    this.shroud.append(block)
    
  }


  bindRegistration(handler) {
    this.shroud.addEventListener('click', event => {
      if (event.target.id === 'reg') {
        handler(this.data)
      }
    })
  }
}

export default View