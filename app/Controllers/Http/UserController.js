'use strict'

const User = use('App/Models/User')

class UserController {

  async index ({ request, response, view }) {
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {

  }

  async edit({ view, response, params }) {
    const user = await User.findOne({ _id: params.id})
    if(user){
      return view.render('user.profile',{ user })
    }
    return response.redirect('back')
  }

  async update ({ params, request, response }) {
    const data = request.all()
    console.log(data)
    const user = await User.findOneAndUpdate({ _id: params.id }, data)
    return response.redirect(`/`)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
