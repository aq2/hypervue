<template lang="pug">
  
header
  //- #sidebar-toggle(@click='toggleSidebar') 
    .tooltip 
      icon(v-if='sidebarOpen' name='chevron-circle-left' scale=2)
      icon(v-else name='chevron-circle-right' scale=2)
      span(class='tooltiptext tooltip-right') click to toggle sidebar
  
  #headerLinks
    TheHeaderLinks
  
  #fullscreen-toggle(@click='toggleFullScreen' class='tooltip')
      span(class='tooltiptext tooltip-left') toggle fullscreen
      icon(name='window-restore' scale=2)

</template>


<script>

import {EventBus} from '../../main'
import TheHeaderLinks from './HeaderLinks'

export default {
  data() {
    return {
      sidebarOpen: false
    }
  },
  components: {
    TheHeaderLinks,
  },
  methods: {
    toggleSidebar: function() {
      this.sidebarOpen = !this.sidebarOpen
      // sidebar listens for this event
      EventBus.$emit('sidebarToggled')
    },
    // todo fugly! copyPasta
    toggleFullScreen: () => {
      const d = document
      var el = d.documentElement
      // todo - change screen size after toggling!
      if (!d.fullscreenElement && !d.mozFullScreenElement &&
        !d.webkitFullscreenElement && !d.msFullscreenElement) {
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
        if (d.exitFullscreen) {
          d.exitFullscreen()
        } else if (document.msExitFullscreen) {
          d.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          d.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          d.webkitExitFullscreen()
        }
      }
      
      EventBus.$emit('sidebarHeight')
      
    }
  },

  created() {
    EventBus.$on('paretoDataBuilt', () => {
      this.$router.push('/viz/pareto/viz')
    } )
  }
}

</script>


<style lang="stylus" scoped>

header 
  display flex

#headerLinks 
  flex-grow 1

#sidebar-toggle
  margin 0
  padding 1rem 3rem 0 .5rem

#fullscreen-toggle
  margin 0
  padding 1rem .5rem 0 0


</style>
