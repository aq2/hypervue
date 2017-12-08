<template lang='pug'>
  <div id="app">
    <q-header></q-header>
    #wrapper
      <q-sidebar></q-sidebar>
      <q-contents/>
    div(v-for="message in massages")
      h4 {{message.title}}
      p {{ message.text}} 
      p {{ message.timestamp}} 
  </div>

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
      $('#sidebar').style.height = contentH + 'px'
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
  background #f00
  margin 0

#wrapper
  background orange
  display flex

#sidebar
  transition 1s all ease
  width 15px
  padding-left .1em

#content
  background #456
  flex 1
  padding-left .5em


</style>
