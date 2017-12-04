<template lang='pug'>
  #sidebar 
    #toggle(@click='toggleSidebarWidth') >
    #getFile(v-show='page3') get a button
    //- #cats cats
    //- #vizType vizType
</template>


<script>
// register with event bus
import {bus} from '../main'

export default {
  data() {
    return {
      page3: false
    }
  },
  methods: {
    toggleSidebarWidth: () => {
      // toggle between 15 and 150px
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 30 ? '15px' : '150px'
    },
    doPage3: () => {
      console.log('sidebar sez page 3')
      this.page3 = true
    }
  },
  created() {
    bus.$on('pageEvt', (data) => {
      if (data == 3) {
        this.doPage3()
      }
    })
  } 
}
</script>


<style lang='stylus'>

#sidebar 
  background #345
  border 1px solid #345

#toggle
  color white
  // padding: 10px 0 10px 5px

#toggle:hover
    cursor pointer

// .whiteBorder
//   border 5px solid white


</style>
