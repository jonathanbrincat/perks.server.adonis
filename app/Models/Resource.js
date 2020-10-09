'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Resource extends Model {
  entry() {
    return this.belongsTo('App/Models/Entry')
  }
}

module.exports = Resource
