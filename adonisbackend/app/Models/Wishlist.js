'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Wishlist extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    blog() {
        return this.belongsTo('App/Models/Blog')
    }
}

module.exports = Wishlist
