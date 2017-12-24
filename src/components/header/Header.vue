<template lang="pug">
  
header
  #sidebar-toggle(@click='toggleSidebar') 
    .tooltip 
      icon(v-if='sidebarOpen' name='chevron-circle-left' scale=2)
      icon(v-else name='chevron-circle-right' scale=2)

      span(class='tooltiptext tooltip-right') click to toggle sidebar
  //- #headerLinks
  //-   TheHeaderLinks
  #newLinks
    TheNewLinks
  
  #fullscreen-toggle(@click='toggleFullScreen' class='tooltip')
      span(class='tooltiptext tooltip-left') toggle fullscreen
      icon(name='window-restore' scale=2)

</template>


<script>

// import TheHeaderLinks from './HeaderLinks'
import TheNewLinks from './NewLinks'
import {EventBus} from '../../main'

export default {
  components: {
    // TheHeaderLinks,
    TheNewLinks
  },
  methods: {
    toggleSidebar: function() {
     // sidebar listens for this event
     EventBus.$emit('sidebarToggled')
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
  height 100px
  border-bottom 2px solid $g2
  display flex

// #headerLinks
  // width 200px

#newLinks 
  flex-grow 1

#sidebar-toggle
  margin 0
  padding 3rem 3rem 0 .5rem


#fullscreen-toggle
  margin 0
  padding 3rem .5rem 0 0


</style>
