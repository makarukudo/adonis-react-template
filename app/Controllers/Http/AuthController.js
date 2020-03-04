'use strict'

const Env = use('Env')

const User = use('App/Models/User')
const { is, validate, sanitizor } = use('Validator')
const Hash = use('Hash')
const Mail = use('Mail')
const randomString = (length) => Math.random().toString(36).substring(2, length || 6);

class AuthController {

  async register({ request, response }) {
    let user = request.all()
    user.password = await Hash.make(user.password)
    user.slug = await sanitizor.slug(user.firstname + '' + user.lastname)
    await User.create(user)
    return response.redirect('/login')
  }

  async login({ auth, session, request, response }) {
    const { username, password } = request.all()
    let where = is.email(username) ? { email: username } : { mobile: username }
    const user = await User.findOne(where)
    if (user) {
      if (await Hash.verify(password, user.password) || user.tempPassword === password) {
        await auth.login(user)
        return response.redirect(`/dashboard`)
      }

      session.withErrors({ message: 'Incorrect password combination', register: false }).flashAll()
      return response.redirect('back')
    }

    session.withErrors({ message: 'Unfortunately the account does not exists', register: true }).flashAll()
    return response.redirect('back')
  }

  async mobileVerification({ request, response }) {
    const { mobile } = request.all()
    console.log(mobile)
    const user = await User.findOne({ mobile: mobile })
    if(user){
      return response.redirect('/forgot-password')
    }
  }

  async resetPassword({ session, request, response }) {
    const { email } = request.all()
    const tempPassword = randomString(8)
    const verifyCode = randomString(20)

    const user = await User.findOne({ email })

    if (user) {
      user.verifyCode = verifyCode
      user.tempPassword = tempPassword
      await user.save()
      session.withErrors({ message: 'Please click the change password link', register: true }).flashAll()

      const confirmResetPasswordLink = 'http://localhost:7005/confirm-reset-password/' + verifyCode
      // next will sending the email

      const mailData = {
        link: confirmResetPasswordLink,
        email: user.email,
        name: user.lastname,
        tempPassword: user.tempPassword

      }

      await Mail.send('emails.reset-password', mailData, (message)=> {
        message
          .to(user.email)
          .from('corbeltester2019@gmail.com')
          .subject('Welcome to Nextdapps')
      })

    } else {
      session.withErrors({ message: 'Unfortunately, account does not exist', register: true }).flashAll()
    }
    session.withErrors({ message: 'Please click the change password link', register: true }).flashAll()
    return response.redirect('/login')
  }

  async confirmResetPassword({ params, session, request, response }) {
    const verifyCode = params.verifyCode
    const user = await User.findOne({ verifyCode })
    if (user) {
      user.password = await Hash.make(user.tempPassword)
      await user.save()
      session.withErrors({ success: 'Please login with your temporary password', register: true }).flashAll()
    } else {
      session.withErrors({ message: 'Unfortunately the account does not exists', register: true }).flashAll()
    }
    return response.redirect('/login')
  }

}

module.exports = AuthController
