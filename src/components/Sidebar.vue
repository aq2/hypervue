<template lang='pug'>
 
  #sidebar 
    #toggle(@click='toggle'  class='tooltip') 
      span(class='tooltiptext') click to toggle sidebar
      icon(v-if='open' name='chevron-circle-left')
      icon(v-else name='chevron-circle-right')
      br
    #fullscreen(@click='goFullScreen()')
      icon(name='window-restore')
    sidebar-links(v-if='open')



</template>


<script>

import {eventBus} from '../main'
import SidebarLinks from './SidebarLinks'

export default {
  components: {
    'sidebar-links': SidebarLinks
  },
  data() {
    return {
      open: true,
      currentPage: 1
    }
  },
  methods: {
    toggle: function() {
      this.open = !this.open
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 30 ? '25px' : '150px'
    },
    openSidebar: function() {
      // console.log('opened')
      let sid = $('#sidebar')
      sid.style.width = '150px'
      this.open = true
    },
    closeSidebar: function() {
      let sid = $('#sidebar')
      sid.style.width = '25px'
      this.open = false
    },
    goFullScreen() {
      var el = document.documentElement,
        rfs = el.requestFullScreen
          || el.webkitRequestFullScreen
          || el.mozRequestFullScreen
          || el.msRequestFullscreen

      rfs.call(el)
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
    // enterFullscreen()
  }
  
}
</script>


<style lang='stylus' scoped>

#sidebar
  border 1px solid $g3
  background $g3
  transition .1s all ease-out
  box-sizing border-box
  width 150px
  height 100vh
  margin 0
  border-right 1px solid $g2
  // padding .25rem

#toggle
  color #ddd
  text-align left
  width 80px
  padding-left .15rem

#toggle:hover
  cursor pointer




</style>
