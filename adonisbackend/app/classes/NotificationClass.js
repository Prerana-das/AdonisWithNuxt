'use strict'
// helpers
const Ws = use('Ws')
module.exports = class NotificationClass {

    // chat notificaiton
    sendChatWSNotificaiton(conversation_id, message, receiver_id, chat_id, user) {
        console.log('testtt ws');
        const meta = {
            input: {
                conversation_id: conversation_id,
                message: message,
                receiver_id: receiver_id,
                chat_id: chat_id,
                id: chat_id,
                created_at: new Date(),
                name: user.name,
                user_id: user.id,
            },
            type: 'chat-sent'

        }
        const chat = Ws.getChannel('notification:*')
        const p = chat.topic(`notification:${receiver_id}`)
        if (p) {
            console.log('socket is called for', receiver_id)
            p.broadcastToAll('message', meta)
        }
    }
}