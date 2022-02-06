import moment from 'moment'

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
}

export default Model