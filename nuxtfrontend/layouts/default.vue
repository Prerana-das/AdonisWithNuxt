<template>
  <div>
    <MyHeader/>
    <nuxt/>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
  },
    mounted() {
    if (!this.authUser) {
      return;
    }
    const ws = adonis.Ws("ws://localhost:3333/");
    ws.connect();

    const chat = ws.subscribe(`notification:${this.authUser.id}`);
    chat.on("error", (error) => {
      console.log(error);
    });
    ws.getSubscription(`notification:${this.authUser.id}`).on(
      "message",
      (data) => {
        // chat sent
        if (data.type === "chat-sent") {
          console.log("data", data);
          this.$store.commit("messenger/pushIntoLastChats", data.input);
        }
      }
    );
  },
}
</script>

<style>


</style>
