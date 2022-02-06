import {loginUser} from '../../api/api.js'

class Model {
  constructor() {
  }

  loginUser(data) {
    const res = loginUser(data).then(res => {
      if (res.isLogin) {
        localStorage.setItem('user', JSON.stringify({...res, isLogin: true}))
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