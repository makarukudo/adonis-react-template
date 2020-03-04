'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')
const { ObjectId, Mixed } = mongoose.Schema.Types

/**
 * @class User
 */
class User extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'UserHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * User's schema
   */
  static get schema () {
    return {
      firstname:        { type: String, default: '' },
      lastname:         { type: String, default: '' },
      slug:             { type: String, default: '' },

      mobile:           { type: String, default: '' },
      email:            { type: String, default: '' },
      password:         { type: String, default: '' },
      tempPassword:     { type: String, default: '' }, // non-hashed password
      verifyCode:       { type: String, default: '' },
      referralCode:     { type: String, default: '' },

      emailVerified:    { type: Boolean, default: false },
      mobileVerified:   { type: Boolean, default: false },

      isPremiumMember:  { type: Boolean, default: false },
      isAffiliate:      { type: Boolean, default: false },
      isAdmin:          { type: Boolean, default: false }
    }
  }

  static get schemaOptions () {
    return {
      versionKey: false
    }
  }
}

module.exports = User.buildModel('User')
