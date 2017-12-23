<template lang='pug'>

#sidebarLinks 
  ul
    li
      router-link(to='/' exact) home
    li 
      router-link(to='/data') get data
    
</template>



<style lang="stylus" scoped>

#sidebarLinks 
  margin-top -.5rem
  
ul
  padding 0 
  max-width 140px
  list-style-type none

a  
  margin-bottom .68rem
  text-align center

.router-link-active
  color  $gb
  background saturate($buttonColour, 20%)


</style>
