<template lang='pug'>

#app       
  TheHeader
  #page  
    router-view
    
</template>


<script>

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
    TheHeader
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

</style>
