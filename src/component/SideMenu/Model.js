import { logOut, checkUser } from '../../api/api.js'

class Model {
  constructor() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'))
    } else {
      this.user = {isLogin: false}
    }
    
  }

  bindUser(callback) {
    this.onUser = callback
  }

  logOutUser() {
    logOut().then(res => {
      if (res) {
        localStorage.setItem('user', JSON.stringify({isLogin: false}))
        window.location.href = '/'
      }
    })
  }
}

export default Model