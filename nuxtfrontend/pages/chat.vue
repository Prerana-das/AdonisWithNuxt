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
  }
}
</script>

<style>


</style>
