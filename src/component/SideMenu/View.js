import moment from 'moment'
import homeIcon from '../../assets/home.png'
import exitIcon from '../../assets/exit.png'


class View {
  constructor() {
    this.logOut
    this.app = this.getElement('#root')
    this.ul = this.createElement('ul', 'side-menu')
    this.li = this.createElement('li', 'link')
    this.link = this.createElement('a')
    this.icon = this.createElement('img', 'icon')
    this.icon.src = homeIcon
    this.textLink = this.createElement('span')
    this.textLink.textContent = 'Главная'
    this.link.href= '/'
    this.link.append(this.icon, this.textLink)
    this.li.append(this.link)
    this.ul.append(this.li)
    this.app.append(this.ul)
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

  displayLinkUser(user) {
    if (user?.isLogin) {
      const profile = this.createElement('li', 'link')
      const link = this.createElement('a', 'profile')
      link.href= `./?id=${user.uid}#profile`

      const content = this.createElement('div', 'content') 
      const name = this.createElement('span', 'name')
      name.textContent = user.userName

      const avatar = this.createElement('img', 'avatar')
      avatar.src = user.photoURL
      avatar.style.border = `2px solid ${user.color}`
      avatar.alt = 'error'

      const login = this.createElement('span', 'login')
      login.textContent = '@' + user.login
      content.append(name, login)
      link.append(avatar, content)

      const logOut = this.createElement('button')
      logOut.id = 'logOut'

      const logOutIcon = this.createElement('img', 'icon')
      logOutIcon.src = exitIcon
      const textLink = this.createElement('span')
      textLink.textContent = 'Выйти'

      logOut.append(logOutIcon, textLink)
      this.logOut = logOut
      profile.append(link)
      this.ul.append(profile, logOut)
    }
  }

  bindLogOut(handler) {
    this.logOut &&
    this.logOut.addEventListener('click', event => {
        handler()
    })
  }
}

export default View