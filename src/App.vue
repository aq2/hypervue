<template lang='pug'>

#app       
  TheHeader
  #page
    #sid
      TheSidebar
    #main  
      router-view
    
</template>


<script>

import TheSidebar from './components/sidebar/Sidebar.vue'
import TheHeader from './components/header/Header.vue'

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
    TheSidebar,
    TheHeader
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

html 
  box-sizing border-box
  
// *, *:before, *:after
//   box-sizing inherit

body 
  margin 0
  background $g4

#page
  display flex
  min-width 800px
  // background blue

#main  
  padding 1rem

</style>
