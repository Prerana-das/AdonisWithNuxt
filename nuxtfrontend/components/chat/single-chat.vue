<template>
  <div>
      <div>
          <h5 class="chat_title">Chat</h5>
              <div class="chat-user-info">
                <h3 class="capitalize">{{ activePerson.name }}</h3>
              </div>
            <div class="chat-inbox full-width">
              <template v-if="getLastChats.length > 0">
                <div v-for="(item, chat_index) in getLastChats" :key="chat_index">
                  <div
                    v-if="item.message_sender != authUser.id"
                    :id="`m-${item.id}`"
                    class="chat-inbox-msg chat-owner-msg chat-justify-left"
                  >
                    <div class="chat-msg-container">
                      <div class="chat-msg-item">{{ item.message }}</div>
                      <div class="chat-msg-time">
                        {{ item.created_at }}
                      </div>
                    </div>
                    <div class="chat-msg-img">
                        <img src="/../images/profile.png" alt="" />
                    </div>
                  </div>

                
                  <div
                    v-else
                    :id="`m-${item.id}`"
                    class="chat-inbox-msg chat-owner-msg chat-justify-right"
                  >
                    <div class="chat-msg-container">
                      <div class="chat-msg-item">{{ item.message }}</div>
                      <div class="chat-msg-time">
                          {{ item.created_at }}
                      </div>
                    </div>
                    <div class="chat-msg-img">
                      <img src="/../images/profile.png" alt="" />
                    </div>
                  </div>
                </div>
                </template>
              <template v-else>
                  <p>You are up to date!</p>
              </template>
            </div>

          <div class="chat-message-sender-input">
              <div class="chat-message-input">
                <textarea
                  v-model="form.message"
                  @keyup.enter="insertChat()"
                  placeholder="Start typing your message.."
                ></textarea>
              <button @click="insertChat()" style="cursor: pointer;">
                <Icon type="ios-paper-plane" />
              </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
   computed: {
    ...mapGetters({
      getLastChats: "messenger/getLastChats",
      activePerson: "messenger/getActivePerson",
    }),
  },
  data() {
    return {
      form: {
        message: "",
        receiver: ""
      }
    };
  },

  methods: {
      async insertChat() {
      if (this.form.message.trim() == "") {
        return;
      }

      let receiver = this.activePerson.id;

      let obj = {
        message_sender: this.authUser.id,
        message_receiver: this.authUser.id == 1 ? 2 : 1,
        conversation_id: Number(this.$route.query.conversation_id),
        message: this.form.message,
        seen: 0,
        deleted: 0,
        sending_status: "sending",
      };

      this.getLastChats.push(obj);

      this.form.receiver = receiver;
      const res = await this.callApi("post","addChat",this.form);

      if (res.status == 200) {
        let sound = "/pull-out.mp3";
        let audio = new Audio(sound);
        audio.play();
        // this.$store.commit("messenger/updateLastMessageToChatList",this.getLastChats[this.getLastChats.length - 1]);
      
      } else {
        if (res.data.message) {
          this.e(res.data.message);
        }
      }

      this.form = {}
    },
  }
}
</script>

<style>

</style>