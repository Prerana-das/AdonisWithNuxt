<template>
  <div>
      <div class="user_list_area">
          <h5>User List</h5>
          <ul class="user_list">
            <li v-for="(item,index) in userDataList" :key="index">
              <span @click="selectChatPerson(item,index)">{{item.id}} - {{item.name}}</span>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
   computed: {
    ...mapGetters({
      userDataList: "messenger/getUserList",
    }),
  },
    data(){
		  return {
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
    
  mounted() {
    if (this.userDataList.length > 0) {
      this.getChats(this.userDataList[0].id);
    }
  },
  created(){
    
     let obj = {
          id: this.userDataList[0].id,
          name: this.userDataList[0].name
      };
     this.$store.commit("messenger/setActivePerson", obj);
  }

}
</script>

<style>

</style>