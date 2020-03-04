'use strict'

class ForgotPassword {
  get rules () {
    return {
      email: 'required|email'
    }
  }

  get messages(){
    return{
      'required': `Ooh! don't leave empty {{ field }} empty`,
      'email': 'Make sure that {{ field }} is valid'
    }
  }

  async fails(errorMessage) {
    this.ctx.session.withErrors( errorMessage ).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ForgotPassword
