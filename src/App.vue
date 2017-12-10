<template lang='pug'>
  #app
    q-sidebar
    #contents-wrapper
      q-header
      q-contents
       

</template>

// <script src="https://www.gstatic.com/firebasejs/4.7.0/firebase.js"></script>

<script>
import Firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBNYxHpiJt0U-h9Yb3E4MGXVCUBywtFpck",
  authDomain: "dvzvue.firebaseapp.com",
  databaseURL: "https://dvzvue.firebaseio.com",
  projectId: "dvzvue",
  storageBucket: "dvzvue.appspot.com",
  messagingSenderId: "804794548950"
};

let app = Firebase.initializeApp(config);
let db = app.database()
let messagesRef = db.ref('massages')

export default {
  name: 'app',
  firebase: {
    massages: messagesRef
  },
  mounted: function() {
    this.makeSidebarTaller()
  },  
  methods: {
    makeSidebarTaller: function() {      
      var windowH = window.innerHeight
      var headerH = $('#header').offsetHeight
      var contentH = windowH - headerH
      $('#sidebar').style.height = windowH + 'px'
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
  background #00f
  margin 0
  // display flex

#app 
  display flex
  background #f00

#contents-wrapper
  background #777
  // display inline-flex
  flex-grow 1

#sidebar
  transition 1s all ease
  width 150px
  // padding-left .1em
  box-sizing border-box
  
  // display flex

#content
  background #456
  // flex 1
  padding-left .5em


</style>
