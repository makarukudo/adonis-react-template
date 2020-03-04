'use strict'

const User = use('App/Models/User')
const { sanitizor } = use('Validator')
const Hash = use('Hash')
/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async dashboard({ request, response, view }) {
    return view.render('user.dashboard')
  }
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const users = await User.find({}, '-password')
      .sort({ updated_at: -1 })

    return response.json({ status: true, users })
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    let data = request.all()
    data.password = await Hash.make(data.password)
    data.slug = sanitizor.slug(data.firstname + ' ' + data.lastname)
    console.log(data)
    const user = await User.create(data)
    return response.json({ status: true, user })
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const user = await User.findOne({ _id: params.id })
    if (user) {
      return response.json({ status: true, user })
    }
    return response.status(404).json({ status: false })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    let data = request.all()
    const user = await User.findOneAndUpdate({ _id: params.id }, data)
    return response.json({ status: true })
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {
    //if (auth.user.isAdmin) {
      const user = await User.findOneAndDelete({ _id: params.id })
      return response.json({ status: true })
    //}
  //  return response.status(401).json({ status: false })
  }
}

module.exports = UserController
