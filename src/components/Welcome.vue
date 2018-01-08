<template lang="pug">

  #welcome
    h1 Welcome to HyperDViz
    icon(name='bar-chart' scale=8)
    icon(name='area-chart' scale=8)
    icon(name='line-chart' scale=8)
    icon(name='pie-chart' scale=7)

    #text
      p it doesn't look like much yet, but it will be great!
      p it's better to run this app in full-screen mode, toggled with F11,
      p or with the &nbsp;
        icon(name='window-restore' scale=2)
        | &nbsp; button at top-right
      br    
      p press the 'next page' button below to continue

    #link
      router-link(to='/data' class='throb') next page

</template>


<style lang="stylus" scoped>

#welcome 
  margin 1rem

#icon 
  font-size 6rem
  text-align center

#text 
  margin 1rem 0
  background $g5
  padding 0.5rem 1rem
  width 600px

a  
  background blue

</style>
