'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    chat() {
        return this.hasOne('App/Models/Chat').select('conversation_id', 'message', 'created_at')
    }
    user() {
        return this.belongsTo('App/Models/User', 'sender')
    }
}

module.exports = Conversation
