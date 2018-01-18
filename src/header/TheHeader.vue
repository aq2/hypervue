<template lang="pug">
  
#header
  #headerLinks
    HeaderLinks
  
  #help
    button(@click='help' class='tooltip')
      span(class='tooltiptext tooltip-left') what do i do?
      icon(name='question-circle' scale=2)

  #fullscreen-toggle 
    button(@click='toggleFullScreen' class='tooltip')
      span(class='tooltiptext tooltip-left') toggle fullscreen
      icon(name='window-restore' scale=2)

</template>


<script>

import {EventBus} from './../main'
import HeaderLinks from './HeaderLinks'

export default {
data() {
  return {
    sidebarOpen: false
  }
},
components: {
  HeaderLinks,
},
methods: {
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
    // sidebar listens for this event
    EventBus.$emit('sidebarToggled')
  },
  
  toggleFullScreen() {
    const d = document
    if (!d.fullscreenElement && !d.mozFullScreenElement &&
      !d.webkitFullscreenElement && !d.msFullscreenElement) {
      this.goFullScreen()
    } else {
      this.unFullScreen()
    }
  },
  
  goFullScreen() {
    var el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else
    if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else 
    if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else 
    if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
  },

  unFullScreen() {
    const d = document
    if (d.exitFullscreen) {
      d.exitFullscreen()
    } else 
    if (d.msExitFullscreen) {
      d.msExitFullscreen()
    } else 
    if (d.mozCancelFullScreen) {
      d.mozCancelFullScreen()
    } else 
    if (d.webkitExitFullscreen) {
      d.webkitExitFullscreen()
    }  
  },

  help() {
    // todo!      
  }

  },  
  created() {
    EventBus.$on('paretoDataBuilt', () => {
      this.$router.push('/viz/pareto/viz')
    })

    EventBus.$on('fullScreen', () => {
      this.goFullScreen()
    })
  }
}

</script>


<style lang="stylus" scoped>

#header
  display flex

#headerLinks 
  flex-grow 1

#fullscreen-toggle
  margin 0

button
  height 60px


</style>
