<template>
  <div>
      <div>
          <h5>User List</h5>
          <ul v-for="(item,index) in userData" :key="index">
            <li @click="selectChatPerson(item,index)">{{item.id}} - {{item.name}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
		  return {
       userData:[],
       getChatsForSingleCon:[]
    }
  },
   methods : {
      selectChatPerson(item,index){
         let obj = {
            id: item.id,
            name: item.name
        };
        this.$store.commit("messenger/setActivePerson", obj);
        return this.getChats(item.id);
      },

      async getChats(id) {
          const res = await this.callApi("get", `chatWithLastPerson/${id}`);
          if(res.status==200){
            this.getChatsForSingleCon=res.data.chats
          }
          this.$store.commit("messenger/setLastChats", this.getChatsForSingleCon);
        },
    },
    
  	async created(){
      const res = await this.callApi('get',`getAllUser`)
      if(res.status == 200) {
          this.userData= res.data
      }
		else{
			this.swr()
		}
	}, 
    // async asyncData({ app, params, query }) {
    //   try {
    //     const res = await app.$axios.get(`/getAllUser`);
    //     if (res.status == 200) {
    //       userData = res.data;
    //     }
    //     return {
    //       userData: userData,
    //     };
    //   } catch (e) {}
    // },
}
</script>

<style>

</style>