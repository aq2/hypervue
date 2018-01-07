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
  }
}

</script>


<style lang="stylus">

html 
  box-sizing border-box
  height 100%
  
*, *:before, *:after
  box-sizing inherit

body 
  margin 0
  background $g4
  height 100%

#app 
  height 100%
  display flex
  flex-direction column

#page
  display flex
  min-width 800px
  flex-grow 1
  // transition all 1s ease

#main  
  padding 0.25rem 27px 1rem 27px
  flex-grow 1

</style>
