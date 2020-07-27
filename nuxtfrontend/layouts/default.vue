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
  }
}
</script>

<style>


</style>
