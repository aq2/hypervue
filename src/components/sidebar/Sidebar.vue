<template lang='pug'>
 
  #sidebar 
    //- TheSidebarLinks(v-show='open')

</template>


<script>

// import TheSidebarLinks from './SidebarLinks'
import {$} from '../../modules/helpers'
import {EventBus} from '../../main'


export default {
  components: {
    // TheSidebarLinks
  },
  data() {
    return {
      open: true,
      // currentPage: 1
    }
  },
  methods: {
    toggle: function() {
      this.open = !this.open
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 50 ? '10px' : '150px'
    }
  },
  created() {
    EventBus.$on('sidebarToggled', () => {
      this.toggle()
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
  height 80vh // todo!
  margin 0
  padding 0
  border-right 2px solid $g2
//


</style>
