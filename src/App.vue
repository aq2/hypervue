<template lang='pug'>

#app       
  TheHeader
  #page
    TheSidebar
    #main  
      router-view
    
</template>


<script>

import TheHeader from './components/header/Header.vue'
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
    TheHeader,
    TheSidebar
  },
  methods: {
    // todo fugly! copyPasta - switch?
    toggleFullScreen(e) {
      const d = document
      e = e || d.documentElement
      if (!d.fullscreenElement && !d.mozFullScreenElement &&
        !d.webkitFullscreenElement && !d.msFullscreenElement) {
        if (e.requestFullscreen) {
          e.requestFullscreen()
        } else if (e.msRequestFullscreen) {
          e.msRequestFullscreen()
        } else if (e.mozRequestFullScreen) {
          e.mozRequestFullScreen()
        } else if (e.webkitRequestFullscreen) {
          e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        if (d.exitFullscreen) {
          d.exitFullscreen()
        } else if (d.msExitFullscreen) {
          d.msExitFullscreen()
        } else if (d.mozCancelFullScreen) {
          d.mozCancelFullScreen()
        } else if (d.webkitExitFullscreen) {
          d.webkitExitFullscreen()
        }
      }
    }
  }
}

</script>


<style lang="stylus">

html 
  box-sizing border-box
  
*, *:before, *:after
  box-sizing inherit

body 
  margin 0
  background $g4

#page
  display flex
  min-width 800px

#main  
  padding 1rem 27px

</style>
