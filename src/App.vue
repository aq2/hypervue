<template lang='pug'>

#app
  SideBarController   
  PageController

    
</template>


<script>

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
    PageController,
    SideBarController    
  }
}

</script>


<style lang="stylus">

* 
  box-sizing border-box
  user-select none

body 
  margin 0
  padding 0
  color #111
  font-size 1.15em
  font-family Ubuntu, Helvetica, Arial, sans-serif

#app 
  display flex        // sidebar 'fixed', #main grows


</style>
