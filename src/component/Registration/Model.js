import { registerUser } from '../../api/api.js'

class Model {
  constructor() {
  }

  registrationUser(data) {
    registerUser(data).then(res => {
      if (res.isRegistration) {
        localStorage.setItem('user', JSON.stringify({...res.user, isLogin: true}))
        window.location.href = '/'
      }
    })
  }
}

export default Model