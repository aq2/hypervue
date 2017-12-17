<template lang='pug'>
 
  #sidebar 
    #toggle(@click='toggle'  class='tooltip') 
      span(class='tooltiptext') click to toggle sidebar
      icon(v-if='open' name='chevron-circle-left')
      icon(v-else name='chevron-circle-right')
      br
    //- #fullscreen(@click='goFullScreen()')
      icon(name='window-restore')
    TheSidebarLinks(v-show='open')



</template>


<script>

// import {EventBus} from '../../main'
import TheSidebarLinks from './SidebarLinks'

// todo find out how to import $
// or better, import it globally
// how am i doing it now window.$ in main.js

export default {
  components: {
    TheSidebarLinks
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
  color #789
  text-align left
  width 80px
  padding-left .15rem

#toggle:hover
  cursor pointer

</style>
