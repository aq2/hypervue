<template lang='pug'>
  #sidebar 
    #toggle(@click='toggleSidebarWidth') >
    get-file(v-show='page3')
    //- #cats cats
    //- #vizType vizType
</template>


<script>
// register with event bus
import {bus} from '../main'
import getfile from './GetFile.vue'

export default {
  components: {
    'get-file': getfile
  },
  data() {
    return {
      page3: false
    }
  },
  methods: {
    toggleSidebarWidth: () => {
      let sid = $('#sidebar')
      sid.style.width = sid.offsetWidth >= 30 ? '15px' : '150px'
    }
    
  },
  created() {
    bus.$on('pageEvt', (data) => {
      if (data == 3) {
        this.page3 = true
      }
    })
  },
  computed: {

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
