<template lang='pug'>
 
  #sidebar 
    #toggle(@click='toggle' class='tooltip') 
      span(class='tooltiptext') click to toggle sidebar
      icon(v-if='open' name='chevron-circle-left' scale=2)
      icon(v-else name='chevron-circle-right' scale=2)
      br
    TheSidebarLinks(v-show='open')

</template>


<script>

import TheSidebarLinks from './SidebarLinks'

// todo find out how to import $
// or better, import it globally
// how am i doing it now window.$ in main.js

export default {
  components: {
    TheSidebarLinks
  },
  data() {
    return {
      open: true,
      currentPage: 1
    }
  },
  methods: {
    toggle: function() {
      this.open = !this.open
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 50 ? '42px' : '150px'
    }
  }
}

</script>


<style lang='stylus' scoped>

#sidebar
  background $g3
  transition .1s all ease-out
  box-sizing border-box
  // width 150px
  height 100vh
  margin 0
  padding 0
  border-right 2px solid $g2

#toggle
  color $g8
  width 80px
  padding .45rem 0 0 .25rem
  margin 0

  &:hover
    cursor pointer
    color $gb

</style>
