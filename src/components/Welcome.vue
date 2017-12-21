<template lang="pug">

  #welcome
    h1 Welcome to HyperDViz
    icon(name='bar-chart' scale=8)
    icon(name='area-chart' scale=8)
    icon(name='line-chart' scale=8)
    icon(name='pie-chart' scale=7 pulse)

    #text
      p it doesn't look like much yet, but it will be great!
      p it's better to run this app in full-screen mode, toggled with F11
      span you can also toggle the sidebar by clicking on  
        icon(name='chevron-circle-left')
      br 
      br    
      p press the 'next page' button below to continue

    #link
      router-link(to='/data') next page

</template>


<style lang="stylus" scoped>

#icon 
  font-size 6rem
  text-align center

#text 
  margin 1rem 0
  background $g5
  padding 0.5rem 1rem

#link
  width 150px
  padding 0.5em
  background $blue
  text-align center
  border-radius 5px
  border 2px solid yellow
  animation throb linear 2s infinite

</style>
