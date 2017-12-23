<template lang="pug">
  
header
  #sidebar-toggle(@click='toggle') 
    .tooltip 
      icon(v-if='sidebarOpen' name='chevron-circle-left' scale=2)
      icon(v-else name='chevron-circle-right' scale=2)

      span(class='tooltiptext tooltip-right') click to toggle sidebar
  #headerLinks
    TheHeaderLinks
  #pageicon
    icon(name='home' scale=5)
  #title
    h1 HyperDViz
  #fullscreen-toggle(@click='toggleFullScreen' class='tooltip')
      span(class='tooltiptext tooltip-left') toggle fullscreen
      icon(name='window-restore' scale=2)

</template>


<script>

import TheHeaderLinks from './HeaderLinks'

export default {
  components: {
    TheHeaderLinks
  },
  data() {
    return {
      sidebarOpen: false,
      currentPage: 1
    }
  },
  methods: {
    toggle: function() {
      this.sidebarOpen = !this.sidebarOpen
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 50 ? '12px' : '150px'
    },
    // todo fugly! copyPasta
    toggleFullScreen: function() {
      var el = document.documentElement
      if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      }
    }

  
  }
}

</script>



<style lang="stylus" scoped>

header 
  background $g3
  height 120px
  border-bottom 2px solid $g2
  display flex

#headerLinks
  // background lime
  width 200px

#pageicon 
  // background green

#title
  // background blue
  flex-grow 1

#sidebar-toggle
  margin 0
  padding 0.2rem



</style>
