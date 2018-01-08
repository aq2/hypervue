<template lang='pug'>
 
  #sidebar 

</template>


<script>

import {EventBus} from '../../main'

export default {
  data() {
    return {
      open: true,
    }
  },
  
  methods: {
    toggle: function() {
      this.open = !this.open
      let sid = document.getElementById('sidebar')
      sid.style.width = sid.offsetWidth >= 50 ? '0px' : '150px'
    },
    openUp: function() {
      this.open = true
      let sid = document.getElementById('sidebar')
      sid.style.minWidth = '150px'
    }
  },
  
  created() {
    EventBus.$on('sidebarToggled', () => {
      this.toggle()
    })
    
    EventBus.$on('sidebarOpen', () => {
      this.openUp()
    })
  }
}

</script>


<style lang='stylus'>

#sidebar
  background $g3
  transition .1s all ease-out
  box-sizing border-box
  width 10px
  margin 0
  padding 0
  border-right 2px solid $g2
//


</style>
