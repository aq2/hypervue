<template lang='pug'>
///
#app
  app-sidebar
  app-contents
       
</template>

// qq
// <script src="https://www.gstatic.com/firebasejs/4.7.0/firebase.js"></script>


///
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
};
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
  },
  mounted: function() {
    this.makeSidebarTaller()
  },  
  methods: {
    makeSidebarTaller: function() {      
      var windowH = window.innerHeight
      $('#sidebar').style.height = windowH + 'px'
    }
  }
}
</script>

///
<style lang="stylus">
// $blue = #47c

html 
  box-sizing border-box

*, *:before, *:after
  box-sizing inherit

body
  background #00f
  margin 0

#app 
  display flex
  background #f00

// #contents-wrapper
//   background #777
//   // display inline-flex
//   flex-grow 1

#sidebar
  transition .75s all ease
  box-sizing border-box

#content
  background $grey
  padding-left .5em
  flex-grow 1

button
  background: $blue
  border 1px solid transparent
  padding .5em
  color #aaa
  border-radius 5px
  box-sizing border-box
  font-size 1.2em

button:hover
  background: $lightblue
  cursor: pointer
  color #ccc
  border 1px solid darkblue


</style>
