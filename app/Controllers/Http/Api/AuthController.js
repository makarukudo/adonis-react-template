'use strict'

const User = use('App/Models/User')
const {is} = use('Validator')
const Hash = use('Hash')

// uses Personal Tokens
class AuthController {
  async auth({auth, request, response}) {
    // authenticating either email or mobile
    const {username, password} = request.all()
    let user = false
    const where = is.email(username) ? {email: username} : {mobile: username}
    user = await User.findOne(where)

    if (user) {
      if (await Hash.verify(password, user.password)) {
        const token = await auth.authenticator('api').generate(user)
        return response.json({status: true, token: token.token, user})
      }
    }
    if (user) {
    }

    return response.status(404).json({status: false})
  }

  async logout({auth, response}) {
    await auth.logout()
    return response.json({status: true})
  }
}

module.exports = AuthController
