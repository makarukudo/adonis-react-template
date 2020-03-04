'use strict'

const { Command } = require('@adonisjs/ace')
const pluralize = require('pluralize')
const path = require('path')

class CreateReact extends Command {

  constructor (Helpers) {
    super()
    this.Helpers = Helpers
  }

  static get inject () {
    return ['Adonis/Src/Helpers']
  }

  static get signature () {
    return 'create:react { name: Name of the react page }'
  }

  static get description () {
    return 'Allows you to create react page using adonis create:react folders/REACT_CLASS'
  }

  async handle ({ name }, options) {

    const fullPath = name.split('/')
    const appName = fullPath.pop()
    const template = await this.readFile(path.join(__dirname, './templates/react-page.mustache'), 'utf8')

    /**
     * Directory paths
     */
    const relativePath = path.join(`resources/assets/scripts/${fullPath.join('/')}`, `${appName}.js`)
    const reactPath = path.join(this.Helpers.appRoot(), relativePath)

    return this.generateFile(reactPath, template, { name: appName })

    this.info('Dummy implementation for create:admin command')
  }
}

module.exports = CreateReact
