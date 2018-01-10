<template lang='pug'>

#sidebar
  ParetoSidebar
  //- todo should be dynamic!


</template>


<script>

import {EventBus} from './../main'
// todo - generalise!
import ParetoSidebar from './../pages/viz/pareto/ParetoSidebar'

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
    const sidebarH = windowH - headerH - 1
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
  // this.setHeight()
}
}

</script>


<style lang='stylus' scoped>

#sidebar
  width 150px
  background $g3
  padding-top 0.25rem
  padding-left 0.5rem
  border-right 2px solid $g2

</style>
