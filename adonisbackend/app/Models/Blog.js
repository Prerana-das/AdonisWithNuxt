'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Blog extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    wishlist() {
        return this.hasOne('App/Models/Wishlist')
    }

    totalLike() {
        return this.hasOne('App/Models/Wishlist')
    }
}

module.exports = Blog
