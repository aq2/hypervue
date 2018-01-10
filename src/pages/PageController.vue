<template lang="pug">

#daPage
  Welcome(v-if="page == 'welcome'")
  DataSource(v-if="page == 'dataSrc'")
  ChooseViz(v-if="page == 'viz'")

</template>


<script>

import {EventBus} from './../main'
import Welcome from '../pages/Welcome'
import DataSource from './dataSources/DataSource'
import ChooseViz from './viz/ChooseVizType'

export default {

components: {
  Welcome,
  DataSource,
  ChooseViz
},  

data() {
  return {
    page: 'welcome'
  }
},

created() {
  EventBus.$on('changePage', newPage => {
    this.page = newPage
  })
}

}

</script>
