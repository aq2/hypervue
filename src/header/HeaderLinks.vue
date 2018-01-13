<template lang="pug">

#links  
  button(id='welcome' @click='nextPage(0)')
    icon(name='home' scale=3)
    h1 HyperDViz

  button(id='data' @click='nextPage(1)')
    icon(name='file-excel-o' scale=2.5)
    h1 {{dataTitle}}
  
  button(id='viz' @click='nextPage(4)')
    icon(name='area-chart' scale=3)
    h1 {{vizType}}

</template>


<script>

import {EventBus} from './../main'

export default {

data() {
  return {
    dataTitle: 'data source',
    vizType: 'Choose VizType',
    currentPage: 0,
    pageType: 'welcome'
  }
},

created() {
  EventBus.$on('changeDataTitle', newDataTitle => {
    this.dataTitle = newDataTitle
  })

  EventBus.$on('changeVizTitle', newVizTitle => {
    this.vizType = newVizTitle
  })

  EventBus.$on('changePageType', newPageType => {
    this.pageType = newPageType
    const welcome = this.$('welcome')
    const data = this.$('data')
    const viz = this.$('viz')

    welcome.classList.remove('active')
    data.classList.remove('active')
    viz.classList.remove('active')

    let el = this.$(newPageType)
    el.classList.add('active')
  })

},

mounted() {
  let el = this.$('welcome')
  el.classList.toggle('active')
},

methods: {
  $(ID) {
    return document.getElementById(ID)
  },

  nextPage(newPage) {
    EventBus.$emit('changePage', newPage)
  }
},

}
</script>


<style lang="stylus" scoped>

#links
  width 50vw
  display flex
  margin 0 auto

#links > button
  display flex
  transition all 1s
  align-items baseline

button
  display flex
  color darkblue
  padding 0.5rem
  max-height 60px
  border-radius 0.5rem

h1
  display none

.active
  color lime
  flex-grow 1
  background $g3

.active h1
  margin 0
  color lime
  padding-left 1rem
  display inline-block


</style>
