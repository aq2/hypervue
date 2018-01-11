<template lang="pug">

SideBar(v-if="currentPage.startsWith('viz')")

</template>


<script>

import {EventBus} from './../main'
import SideBar from './Sidebar'

export default {

components: {
  SideBar
},

data() {
  return {
    currentPage: ""
  }
},

created() {
  // need to listen to changePage event
  EventBus.$on('changePage', page => {
    this.currentPage = page
  })
}

}

</script>
