import { registerUser } from '../../api/api.js'

class Model {
  constructor() {
  }

  registrationUser(data) {
   const res = registerUser(data).then(res => {
      if (res.isRegistration) {
        localStorage.setItem('user', JSON.stringify({...res.user, isLogin: true}))
        window.location.href = '/'
        return true
      } else {
        return false
      }
    })

    return res
  }
}

export default Model