'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')
const Hash = use('Hash')

class AddUser extends Command {
  static get signature () {
    return 'add:user'
  }

  static get description () {
    return 'Adding user'
  }

  async handle (args, options) {
    const firstname = await this.ask('Firstname: ')
    const lastname = await this.ask('LastName: ')
    const mobile = await this.ask('Mobile: ')
    const email = await this.ask('Email: ')
    const password = await this.ask('Password: ')

    const user = await User.create({
      firstname,
      lastname,
      mobile,
      email,
      password: await Hash.make(password)
    })

    this.info(`Created a user ${user}`)
  }
}

module.exports = AddUser
