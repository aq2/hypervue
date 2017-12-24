<template lang='pug'>

#links 
  ul
    li
      router-link(to='/' exact) home
    li 
      router-link(to='/data') get data
    li 
      router-link(to='/viz') choose viz
    
</template>



<style lang="stylus" scoped>

#links 
  margin-top -1rem
  // margin 0
  
ul
  padding 0 
  max-width 140px
  list-style-type none

li
  // height 50px

a  
  // margin-bottom .68rem
  // text-align center
  max-width 140px
  // max-height 50px
  background $g4
  

.router-link-active
  color  $gb
  // background saturate($buttonColour, 20%)
  background $g5

</style>
