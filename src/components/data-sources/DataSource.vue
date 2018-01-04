<template lang="pug">

#DataSource
  h1 Choose a dataset
  icon(name='database' scale=8)
  .spacer
  icon(name='upload' scale=8)
  .spacer
  icon(name='tasks' scale=8)
  
  #text
    p First, you need to get some data.
    p either by uploading a CSV file from your computer,
    p or you can pick from an exciting range of sources
  
  #links
    ul 
      li
        router-link(to='data/fb') 
          icon(name='cloud' scale=4)
          p get dataset from firebase
      li
        router-link(to='data/csv')
            icon(name='folder-open' scale=4)
            p get data from CSV file
  

</template>


<style lang="stylus" scoped>

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
  margin 0 auto
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
