<template lang='pug'>

#sidebar
  ParetoSidebar
  //- todo should be dynamic!


</template>


<script>

import {EventBus} from '../../../main'
// todo - generalise!
import ParetoSidebar from '../pareto/ParetoSidebar'

export default {
components: {
  ParetoSidebar
},
  
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
  
  setHeight() {
    const headerH = 60
    const windowH = window.innerHeight
    const sidebarH = windowH - headerH
    let sid = document.getElementById('sidebar')
    sid.style.height = sidebarH + 'px'
  }
},

created() {
  EventBus.$on('sidebarToggled', () => {
    this.toggle()
  })

  EventBus.$on('sidebarHeight', () => {
    this.setHeight()
  })
  
  EventBus.$on('sidebarOpen', () => {
    this.openUp()
  })
},

mounted() {
  this.setHeight()
}
}

</script>


<style lang='stylus' scoped>

#sidebar
  background $g3
  transition .1s all ease-out
  margin 0
  width 150px
  border-right 2px solid $g2
  > div
    padding-left 0.15rem

</style>
