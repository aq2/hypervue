<template lang="pug">

main
  TheHeader
  article
    Welcome(v-if='page==0')
      
    DataSource(v-if='page==1')
    CSVSource(v-if='page==2')
    // FBSource(v-if='page==3')

    ChooseViz(v-if='page==4')
    Pareto(v-if='page == 5')
    ParetoViz(v-if='page == 5')


</template>


<script>

import {EventBus} from './../main'
import TheHeader from './../header/TheHeader'
import Welcome from '../pages/Welcome'
import DataSource from './dataSources/DataSource'
import CSVSource from './dataSources/csv/CSVSource'
import ChooseViz from './viz/ChooseVizType'
import Pareto from './../pages/viz/pareto/Pareto'
import ParetoViz from './../pages/viz/pareto/ParetoViz'


export default {

components: {
  TheHeader,
  Welcome,
  DataSource,
  CSVSource,
  ChooseViz,
  Pareto,
  ParetoViz
},  

data() {
  return {
    page: 0
  }
},

created() {
  EventBus.$on('changePage', newPage => {
    this.page = newPage
  })
}

}

</script>

<style lang="stylus" scoped>

main 
  margin 0
  padding .5rem 0
  flex-grow 1         // expands sideways to fill
  background $g5
  max-height 100vh
  min-height 99.999vh

article
  margin 0
  padding 1rem 0 0 1rem
  background $g5

</style>
