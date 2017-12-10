<template lang="pug">

  #content
    #welcome(v-if='page==1')
      page-welcome
      button(@click='page=2') next page
    page-data(v-if='page==2')

</template>


<script>
import {bus} from '../main'
import page1 from './Welcome.vue'
import page2 from './data-sources/DataSource.vue'
// import page3 from './instructions/Page3.vue'


export default {
  components: {
    'page-welcome': page1,
    'page-data': page2
    // , 'page3': page3
  },
  data() {
    return {
     page: 1  // initially
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">


</style>
