<template lang="pug">

#links  
  router-link(to='/' id='home' exact)
    icon(name='home' scale=3)
    h1 HyperDViz

  //- transition(name='fade')
  router-link(to='/data' id='data')
    icon(name='database' scale=3)
    h1 data source
  
  router-link(to='/viz' id='viz')
    icon(name='area-chart' scale=4)
    
    

</template>


<script>

export default {
 
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
  // padding 0
  margin 0


.fade-enter-active, .fade-leave-active
  transition all 1s

.fade-enter, .fade-leave-to 
  opacity 0
  // background blue


</style>
