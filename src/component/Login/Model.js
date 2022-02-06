import {loginUser} from '../../api/api.js'

class Model {
  constructor() {
  }

  loginUser(data) {
    loginUser(data).then(res => {
      if (res.isLogin) {
        localStorage.setItem('user', JSON.stringify({...res, isLogin: true}))
        window.location.href = '/'
      }
    })
  }
}

export default Model