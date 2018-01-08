<template lang="pug">

#DataSource
  h1 Choose vizType
  icon(name='bar-chart' scale=8)
  .spacer
  icon(name='line-chart' scale=8)
  .spacer
  icon(name='pie-chart' scale=8)
  
  #text
    p Choose viz type.
  
  #links
    ul 
      li
        router-link(to='viz/pareto') 
          icon(name='bicycle' scale=4)
          p pareto dominance plot
      li
        router-link(to='viz/parallel')
            icon(name='line-chart' scale=4)
            p parallel plot
  

</template>


<style lang="stylus" scoped>

#DataSource 
  padding 1rem

.spacer 
  width 50px
  display inline-block
  text-align center

#text 
  background $g5
  padding 0.5rem 1rem
  margin 1rem 0

ul
  padding 0 
  max-width 1020px
  // margin 0 auto
  list-style-type none
  display flex
  justify-content space-around

li
  background $blue
  padding .5rem
  margin 1rem 0
  border-radius 5px
  font-size 1.05rem
  transition 0.5s all ease
  text-align center
  flex-grow 1
  border 2px solid blue
  animation throb linear 2s infinite

li:hover
  background green


h1 
  margin 0 0 1rem 0

a
  padding 2em 0
  width 300px


</style>
