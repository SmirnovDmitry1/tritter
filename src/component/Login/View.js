import Logo from '../../assets/tritter.png'

class View {
  constructor() {
    this.app = this.getElement('#root')
    this.shroud = this.createElement('div', 'shroud')
    this.shroud.id = 'login'

    this.app.append(this.shroud)

    this.data = {
      email: '',
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

    const block = this.createElement('div', 'login')

    const head = this.createElement('div', 'head')

    const iconClose = this.createElement('a', 'close')
    iconClose.href = '/'
    iconClose.textContent = '+'

    const iconLogo = this.createElement('img', 'logo')
    iconLogo.src = Logo

    const content = this.createElement('div', 'content')
    
    const title = this.createElement('span', 'title')
    title.textContent = 'Вход в Триттер'

    const email = this.createElement('input', 'input')
    email.type = 'input'
    email.placeholder = 'Электронная почта'
    email.value = this.data.email

    email.addEventListener('input', (e) => {
      this.data.email = e.target.value
    })

    const password = this.createElement('input', 'input')
    password.type = 'password'
    password.placeholder = 'Пароль'
    password.value = this.data.password

    password.addEventListener('input', (e) => {
      this.data.password = e.target.value
    })

    const button = this.createElement('button')
    button.id = 'singIn'
    button.textContent = 'Войти'

    const span = this.createElement('span', 'reg')
    span.textContent = 'Не учетной записи? '

    const link = this.createElement('a')
    link.textContent = 'Зарегистрируйтесь'
    link.href = '#registration'

    span.append(link)


    head.append(iconClose, iconLogo)
    content.append(title, email, password, button, span)
    block.append(head, content)

    this.shroud.append(block)
    
  }

  bindLogin(handler) {
    this.shroud.addEventListener('click', event => {
      if (event.target.id === 'singIn') {
        handler(this.data)
      }
    })
  }
}

export default View