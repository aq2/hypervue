<template lang="pug">

#links  
  router-link(to='/' id='home' exact)
    icon(name='home' scale=3)
    h1 HyperDViz

  router-link(to='/data' id='data')
    icon(name='database' scale=3)
    h1 data source
  
  router-link(to='/viz' id='viz')
    icon(name='area-chart' scale=4)
    h1 {{vizType}}

</template>


<script>

import {EventBus} from '../../main'

export default {

  data() {
    return {
      vizType: 'Choose VizType'
    }
  },

  created() {
    this.vizType = 'Choose VizType'
    EventBus.$on('changeTitle', newTitle => {
      this.vizType = newTitle
    })
  }
}

</script>


<style lang="stylus" scoped>

#links 
  display flex
  max-width 1000px

#links>div
  display flex
  transition all 1s
  align-items baseline

a 
  border-radius 0.5rem
  display flex
  color darkblue
  padding-left 1rem
  max-height 70px

h1 
  display none

.router-link-active
  color lime
  background $g3
  flex-grow 1

.router-link-active h1  
  display inline-block
  padding-left 1rem
  margin 0


</style>
