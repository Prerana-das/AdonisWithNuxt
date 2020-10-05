<template>
  <div>
   <div class="container">
		<div class="row">
            <div class="col-md-3">
                 <List />
            </div>
            <div class="col-md-9">
                <Chat /> 
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Chat from '~/components/chat/single-chat.vue';
import List from '~/components/chat/list.vue';

export default {
  components: {
    List,
    Chat,
  },
   async asyncData({ app,store,params, query }) {
      try {
        var user;
        const res = await app.$axios.get('/getAllUser');
        if (res.status == 200) {
            console.log(res.data);
            user=res.user
            store.commit("messenger/setUserList",res.data);
        }
        return {
          user:user
        };
      } catch (e) {
        console.log(e)
      }
    },
}
</script>

<style>


</style>
