<template lang="pug">

  #content
    //- dynamic component bound to page property
    //- pattern allows compnt data retention using <keep-alive/>
    //- not using it here, but could
    component(v-bind:is='page')
       
    button(v-if="showEvtBtn" @click="nextPage") next page

</template>


<script>
import {bus} from '../main'

import WelcomePage from './Welcome.vue'
import DataSourcePage from './data-sources/DataSource.vue'

export default {
  components: {
    'page-welcome': WelcomePage,
    'page-datasrc': DataSourcePage
  },
  data() {
    return {
      pageNum: 1,
      showEvtBtn: true,
      page: 'page-welcome'       
    }
  },
  methods: {
    nextPage: function() {
      this.pageNum++
      bus.$emit('pageChangeEvt', this.pageNum)
    }
  },
  created() {
    // change paging logic - relies on pageVt
    bus.$on('pageChangeEvt', (pageN) => {
      switch (pageN) {
        case 2:
          this.page = 'page-datasrc'
          this.showEvtBtn = false
          // whatever else...
          break
        case 3:
          // whatever
          break
        default:
          // whatever
      }
    })
  }
}
</script>
