<template lang="pug">

SideBar(v-if="currentPage == 'viz'")

</template>


<script>

import {EventBus} from './../main'
import SideBar from './Sidebar'

export default {

components: {
  SideBar
},

data() {
  currentPage: ""
},

created() {
  // need to listen to changePage event
  EventBus.$on('changePage', page => {
    this.currentPage = page
  })
}


}

</script>


<style lang="stylus" scoped>

</style>

