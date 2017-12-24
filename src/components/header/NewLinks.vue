<template lang="pug">

#links  
  router-link(to='/' id='home' exact)
    icon(name='home' scale=5)
    h1 HyperDViz

  router-link(to='/data' id='data')
    icon(name='database' scale=5)
    h1 data source
  
  router-link(to='/viz' id='viz')
    icon(name='area-chart' scale=6)
    
    

</template>


<script>

export default {
 
}

</script>


<style lang="stylus" scoped>

#links 
  display flex
  max-width 1000px
  // justify-content center

#links>div
  // min-width 150px
  display flex
  transition all 1s
  // padding 2.5rem

#home 
  background blue
  
#data 
  background lime
  
#viz 
  background orange

a 
  border-radius 0
  display flex
  color $g5
  padding-left 1rem

h1 
  // color black
  display none

.router-link-active
  color  white
  // background saturate($buttonColour, 20%)
  background $g5
  flex-grow 1

.router-link-active h1  
  // color white
  display inline-block
  padding-left 1rem

</style>
