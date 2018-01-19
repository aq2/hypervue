<template lang="pug">

#links  
  button(id='welcome' @click='nextPage(0)')
    icon(name='home' scale=3)
    h1 HyperDViz

  button(id='data' @click='nextPage(1)')
    icon(name='file-excel-o' scale=2.5)
    h1 {{dataTitle}}
  
  button(id='viz' @click='nextPage(6)')
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

    // make all inactive
    this.$('welcome').classList.remove('active')
    this.$('data').classList.remove('active')
    this.$('viz').classList.remove('active')

    // make the one active
    this.$(newPageType).classList.add('active')
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
    let pageType
    switch(newPage) {
      case 0:
        pageType = 'welcome'
        break
      case 1:
        pageType = 'data'
        break
      case 8:
        pageType = 'viz'
        break
      default:
        pageType = this.pageType
    }
    EventBus.$emit('changePageType', pageType)
  }
},

}
</script>


<style lang="stylus" scoped>

#links
  width 50vw
  display flex
  margin 0 auto
  // align right

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
