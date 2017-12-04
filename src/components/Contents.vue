<template lang="pug">
  #content
    #pageWrapper
      component(v-bind:is='page') 
      button(id='butt' @click='nextPage') next page
</template>


<script>
import {bus} from '../main'
import page1 from './instructions/Page1.vue'
import page2 from './instructions/Page2.vue'
import page3 from './instructions/Page3.vue'


export default {
  components: {
    'page1': page1,
    'page2': page2,
    'page3': page3
  },
  data() {
    return {
      pageNum: 1,
      page: 'page1'
    }
  },
  methods: {
    nextPage: function() {
      this.pageNum++
      this.page = 'page' + this.pageNum
      // alert('nextPage ' + this.pageNum)
      bus.$emit('pageEvt', this.pageNum)
    }
  }
}
</script>

