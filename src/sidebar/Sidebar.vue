<template lang='pug'>

#sidebar
  ParetoSidebar
  //- todo should be dynamic! ie if page=pareto 


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
  main() {
    // set sidebar height
    // const main = this.$('main')
    const mainH = this.$('main').offsetHeight
    console.log(mainH)
    const headerH = this.$('header').offsetHeight
    const sidebarH = mainH-headerH
    const sidebar = this.$('sidebar')
    sidebar.style.height = sidebarH
    // sidebar.style.maxHeight = sidebarH
  },

  $(ID) {
    return document.getElementById(ID)
  },

  toggle: function() {
    this.open = !this.open
    let sid = document.getElementById('sidebar')
    sid.style.width = sid.offsetWidth >= 50 ? '0px' : '150px'
  }
},

created() {
  EventBus.$on('sidebarToggled', () => {
    this.toggle()
  })

  EventBus.$on('sidebarOpen', () => {
    this.openUp()
  })
},

mounted() {
  this.main()
}

}
</script>


<style lang='stylus' scoped>

#sidebar
  width 155px
  background $g3
  padding-top 0.25rem
  padding-left 0.5rem
  border-right 2px solid $g2
  // max-height 100vh
  // min-height 99.999vh

</style>
