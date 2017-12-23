<template lang='pug'>

#app       
  TheSidebar
  #page-content
    router-view
    #full(@click='toggleFullScreen(this)' class='tooltip2')
      span(class='tooltiptext2') toggle fullscreen
      icon(name='window-restore' scale=2)


</template>


<script>

import TheSidebar from './components/sidebar/Sidebar.vue'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBNYxHpiJt0U-h9Yb3E4MGXVCUBywtFpck",
  authDomain: "dvzvue.firebaseapp.com",
  databaseURL: "https://dvzvue.firebaseio.com",
  projectId: "dvzvue",
  storageBucket: "dvzvue.appspot.com",
  messagingSenderId: "804794548950"
}

import Firebase from 'firebase'
let app = Firebase.initializeApp(config)
let db = app.database()
let messagesRef = db.ref('massages')

export default {
  name: 'app',
  firebase: {
    massages: messagesRef   // qq
  },
  components: {
    TheSidebar
  },
  methods: {
    // todo fugly! copyPasta
    toggleFullScreen(elem) {
      elem = elem || document.documentElement
      if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen()
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
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


<style lang="stylus">

#app
  display flex
  margin 0

#page-content
  padding 0 1rem
  min-width 800px

#full 
  position absolute
  top .55rem
  right .55rem
  cursor pointer
  color $g8

  &:hover
    cursor pointer
    color $gb

</style>
