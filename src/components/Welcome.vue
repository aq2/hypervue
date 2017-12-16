<template lang="pug">

  #welcome
    h1 Welcome to HyperDViz
    //- icon(name='home' scale=8)
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
   
    //- button(class='throbber') foo

</template>


<script>

export default {
  
}
</script>

<style lang="stylus" scoped>

// a
//   border 2px solid yellow
//   animation throb linear 2s infinite

#icon 
  text-align center
  font-size 6rem

#text 
  background $g5
  padding 0.5rem 1rem
  margin 1rem 0

#link
  width 150px
  background $blue
  padding .5em
  text-align center
  border 2px solid yellow
  animation throb linear 2s infinite
  border-radius 5px

</style>
