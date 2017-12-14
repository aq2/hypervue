<template lang='pug'>
 
  #sidebar 
    #toggle(@click='toggleSidebarWidth'  class='tooltip') 
      span(class='tooltiptext') click to toggle sidebar
      icon(v-if='sidebarOpen' name='chevron-circle-left')
      icon(v-else name='chevron-circle-right')
    
    #welcomeBtn(v-if='sidebarOpen')
      button.linky welcome
    
    #dataBtn(v-if='currentPage > 1 && sidebarOpen')
      button.linky data source
    
    //- #page-controller 
      // could have nice things in here

</template>


<script>

import {eventBus} from '../main'

export default {
  data() {
    return {
      sidebarOpen: true,
      currentPage: 1
    }
  },
  methods: {
    toggleSidebarWidth: function() {
      console.log('toggled')
      
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 30 ? '25px' : '150px'
      this.sidebarOpen = !this.sidebarOpen
    },
    openSidebar: function() {
      // console.log('opened')
      let sid = $('#sidebar')
      sid.style.width = '150px'
      this.sidebarOpen = true
    },
    closeSidebar: function() {
      let sid = $('#sidebar')
      sid.style.width = '25px'
      this.sidebarOpen = false
    }
  },
  created() {
    eventBus.$on('pageChangeEvt', (pageN) => {
      this.currentPage = pageN
      switch (pageN) {
        case 1:
          break
        case 2:
          // this.openSidebar()
          // whatever else...
          // change controller?
          break
        case 3:
          // whatever
          break
        default:
          // whatever
      }
      
    })
  }
  
}
</script>


<style lang='stylus' scoped>

#sidebar
  border 1px solid $g3
  background $g3
  transition .5s all ease
  box-sizing border-box
  width 150px
  height 100vh
  margin 0


button
  // width 80px
  // margin 0 auto

#toggle
  color #ddd
  padding: 3px
  text-align left

#toggle:hover
  cursor pointer


span 
  color white

.linky {
  background $grey
  width 130px
  font-size 1rem
  margin 0 auto
  
}

</style>
