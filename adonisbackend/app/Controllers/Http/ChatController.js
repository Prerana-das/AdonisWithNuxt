'use strict'
const { validate, rule } = use('Validator')
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Chat = use('App/Models/Chat')

// classes
const NotificationClass = use("App/Classes/NotificationClass");
const Notification = new NotificationClass();

class ChatController {

  async chatWithLastPerson({ request, response, auth, params }) {

    let user = await auth.getUser()

    //params -- message_sender
    if (!params.id) {
      return response.status(403).json({
        message: "Invalid Request!",
      });
    }
    let conversation = await Conversation.query()
                      .where((builder)=>{
                        builder.where('sender',user.id)
                        builder.where('receiver',params.id)
                      })
                      .orWhere((builder)=>{
                        builder.where('receiver',user.id)
                        builder.where('sender',params.id)
                      }).first();
        if(!conversation){
          conversation = await Conversation.create({
              sender: user.id,
              receiver: params.id,
          });
        }
      

    var [chats, update] = await Promise.all([
      Chat.query()
        .where("conversation_id", conversation.id)
        .where("deleted", "!=", 1)
        .orderBy("id", "desc")
        .limit(15)
        .fetch(),
      Chat.query().where("conversation_id", conversation.id).update({
        seen: 1,
      })
    ]);

    // console.log(chats);

    return {
      chats: this.formateChat(chats),
      conversation_id: conversation.id
    };
  }

  async addChat({ request, response, auth }) {
    let user = await auth.getUser();

    if (!request.body.receiver || (!request.body.message)) {
      return response.status(403).json({
        message: "Invalid Request!",
      });
    }

    const data = request.body;

    let receiver = await User.query().where("id", data.receiver).first();
    receiver = receiver.toJSON();

    // CHECK IF THERE ANY PREVIOUS CONVERSATIONS OR NOT
    const conversation = await Conversation.query()
      .whereRaw(
        `( sender = ${user.id} and receiver = ? ) or ( receiver = ${user.id} and sender = ? )`,
        [data.receiver, data.receiver]
      )
      .first();
      if (conversation) {
        // A PREVIOUS CONVERSATION IS FOUND
        const chat = await Chat.create({
          message_sender: user.id,
          message_receiver: data.receiver,
          attachment_id: null,
          conversation_id: conversation.id,
          message: data.message,
          seen: 0,
          deleted: 0,
        });
        Notification.sendChatWSNotificaiton(
          conversation.id,
          data.message,
          data.receiver,
          chat.id,
          user,
        );

     
      return chat;
    } 
  }

   // static functions
   formateChat(chat) {
    chat = chat.toJSON();
    chat.reverse();
    return chat;
  }

  formateChatLists(chatLists) {
    return chatLists;
  }

}

module.exports = ChatController
