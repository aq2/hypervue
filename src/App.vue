<template lang='pug'>
  <div id="app">
    <q-header></q-header>
    #wrapper
      <q-sidebar></q-sidebar>
      <q-contents/>
  </div>
</template>


<script>

export default {
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
