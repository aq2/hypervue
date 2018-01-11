<template lang="pug">

#links  
  button(id='welcome')
    icon(name='home' scale=3)
    h1 HyperDViz

  button(id='dataSource')
    icon(name='file-excel-o' scale=2.5)
    h1 data source
  
  button(id='viz')
    icon(name='area-chart' scale=3)
    h1 {{vizType}}

</template>


<script>

import {EventBus} from './../main'

export default {

  data() {
    return {
      vizType: 'Choose VizType',
      currentPage: 'welcome'
    }
  },

  created() {
    this.vizType = 'Choose VizType'
    EventBus.$on('changeTitle', newTitle => {
      this.vizType = newTitle
    })

    // EventBus.$on('changePage', newPage => {
    //   this.currentType = newPage
    //   let el = document.getElementById(newPage)
    //   el.style.flexGrow = 1
    // })
  },

  mounted() {
    let el = document.getElementById(this.currentPage)
    el.style.flexGrow = 1

  }
}

</script>


<style lang="stylus" scoped>

#links 
  display flex
  width 50vw
  margin 0 auto

#links > button
  display flex
  transition all 1s
  align-items baseline

button
  border-radius 0.5rem
  display flex
  color darkblue
  padding 0.5rem
  max-height 60px

h1 
  display none





.router-link-active
  color lime
  background $g3
  flex-grow 1
  // border-bottom 2px lime solid

.router-link-active h1  
  display inline-block
  padding-left 1rem
  margin 0
  color lime


</style>
