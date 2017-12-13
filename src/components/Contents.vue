<template lang="pug">

  #content
    #welcome(v-if='page==1')
      page-welcome
      button(@click='page=2') next page
    page-data(v-if='page==2')

</template>


<script>
import {bus} from '../main'
import welcome from './Welcome.vue'
import dataSource from './data-sources/DataSource.vue'
// import page3 from './instructions/Page3.vue'


export default {
  components: {
    'page-welcome': welcome,
    'page-data': dataSource
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
