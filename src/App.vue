<template lang='pug'>

  #app       
    app-sidebar
    #router
      router-view
  
</template>


<script>

import Sidebar from './components/Sidebar.vue'
import Contents from './components/Contents.vue'

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
let app = Firebase.initializeApp(config);
let db = app.database()
let messagesRef = db.ref('massages')

export default {
  name: 'app',
  firebase: {
    massages: messagesRef   // qq
  },
  components: {
    'app-sidebar': Sidebar,
    'app-contents': Contents
  }
}

</script>


<style lang="stylus">

#app
  display flex
  margin 0

#router 
  padding 0 1rem
  min-width 800px

</style>
