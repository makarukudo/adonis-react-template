'use strict'

class Register {
  get rules () {
    return {
      firstname: 'required',
      lastname: 'required',
      email: 'required|email|max:100',
      mobile: 'required|number|max:11',
      password: 'required|max:30',
      repassword: 'required|same:password'
    }
  }

  get validateAll() {
    return true
  }

  // async fails(errorMessage) {
  //   return this.ctx.response.
  //     .status(400).json({ status: false, message: errorMessage[0].message })
  // }
  // get messages() {
  //   return {
  //     'firstname.required': 'Firstname is required',
  //     'lastname.required': 'Lastname is required',
  //     'email.required': 'Email is required',
  //     'mobile.required': 'Mobile is required',
  //     'password.required': 'Password is required',
  //     'repassword.required': 'Comfirm Password is required',
  //     'mobile.max': 'Mobile number must be 11 digits long',
  //     'password.max': 'Password must not exists with 30 charters',
  //     'repassword.same': 'Password did not match',
  //   }
  //}
}

module.exports = Register
