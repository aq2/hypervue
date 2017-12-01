<template lang='pug'>
  #wrapper
    #sidebar my sidebar
      #file file
      #cats cats
      #vizType vizType
    //- <aq-sidebar></aq-sidebar>  
    #main
      h1 {{ foo }}
      button(id='btn1',
        onclick="document.getElementById('sidebar').style.width = '100px'")
          | narrower
</template>



<script>
export default {
  mounted: function() {
    this.makeSidebarTaller()
    // this.makeSidebarSlim(300)
    // this.makeSidebarSlim(30)
    // document.getElementById('btn1')
  },
  
  methods: {
    makeSidebarTaller: function() {      
      var aq = require('./helpers')
      var windowH = window.innerHeight
      var headerH = aq.$('header')
      console.log(headerH)
      var mainH = windowH - 80
      aq.$('sidebar').style.height = mainH + 'px'
    },
    makeSidebarSlim: function(w) {
      var aq = require('./helpers')
      aq.$('sidebar').style.width = w + 'px'
      // document.getElementById('sidebar').style.flex-grow = w 
    },
    transit: function() {
      document.getElementById('sidebar').style.width = '130px'
      alert('foo')      
    }
  },

  computed: {
    foo() {
      return this.$store.state.foo
    }
  }
}
</script>



<style lang='stylus'>
  #wrapper
    background orange
    display flex

  #sidebar
    background steelblue
    transition 2s all ease
    width 150px
    // flex-grow -1

  #main
    background peachpuff
    flex 1
</style>
