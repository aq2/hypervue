<template lang="pug">

#daPage
  Welcome(v-if="page == 'welcome'")
  
  DataSource(v-if="page == 'dataSrc'")
  CSVSource(v-if="page == 'csv'")

  ChooseViz(v-if="page == 'chooseViz'")
  Pareto(v-if="page == 'pareto'")
  VizPareto(v-if="page == 'vizPareto'")


</template>


<script>

import {EventBus} from './../main'
import Welcome from '../pages/Welcome'
import DataSource from './dataSources/DataSource'
import CSVSource from './dataSources/csv/CSVSource'
import ChooseViz from './viz/ChooseVizType'
import Pareto from './../pages/viz/pareto/Pareto'
import VizPareto from './../pages/viz/pareto/ParetoViz'


export default {

components: {
  Welcome,
  DataSource,
  CSVSource,
  ChooseViz,
  Pareto,
  VizPareto
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
