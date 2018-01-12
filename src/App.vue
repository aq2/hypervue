<template lang='pug'>

#app       
  #sidebar
    SideBarController
  #main 
    header
      TheHeader
    #page
      PageController

    
</template>


<script>

import TheHeader from './header/TheHeader'
import SideBarController from './sidebar/SideBarController'
import PageController from './pages/PageController'

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
    PageController,
    SideBarController    
  }
}

</script>


<style lang="stylus">

* 
  box-sizing border-box

html 
  color #111
  font-size 1.2em
  font-family Ubuntu, Helvetica, Arial, sans-serif

body 
  margin 0
  padding 0

#app 
  display flex        // sidebar 'fixed', #main grows

#sidebar
  background blue
  max-height 100vh
  min-height 99.999vh

#main 
  margin 0
  padding 0
  flex-grow 1         // expands sideways to fill
  background $g5

header 
  margin 0
  padding 0
  height 60px
  flex-grow 1         // fills width
  // background $g3
  // border-bottom 2px solid $g1

#page  
  margin 0
  padding 1rem 0 0 1rem
  background $g5

</style>
