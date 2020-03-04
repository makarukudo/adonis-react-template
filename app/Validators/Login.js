'use strict'

class Login {
  get rules () {
    return {
      username: 'required',
      password: 'required',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = Login
