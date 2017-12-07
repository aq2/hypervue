<template lang='pug'>
  #sidebar 
    #toggle(@click='toggleSidebarWidth') >
    get-file(v-show='page3')
    //- #cats cats
    //- #vizType vizType
    button(@click='incCounterFn') +1
    button(@click='') -1
</template>


<script>
// register with event bus
import {bus} from '../main'
import getfile from './GetFile.vue'

export default {
  components: {
    'get-file': getfile
  },
  computed: {
    
  },
  data() {
    return {
      page3: false
    }
  },
  methods: {
    incCounterFn: () => {
      // this.$store.state.myCounter++
    },
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
