'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')
const Hash = use('Hash')
const { sanitizor } = use('Validator')

class SeedDatum extends Command {
  static get signature () {
    return 'seed:datum'
  }

  static get description () {
    return 'Seeding data to mongoose models'
  }

  async handle (args, options) {

    this.info(`Data Seeded`)
  }
}

module.exports = SeedDatum
