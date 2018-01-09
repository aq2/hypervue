<template lang="pug">

#DataSource
  h1 Choose a dataset
  icon(name='database' scale=8)
  .spacer
  icon(name='upload' scale=8)
  .spacer
  icon(name='tasks' scale=8)
  br 
  br
  #text
    p First, you need to get some data.
    p either by uploading a CSV file from your computer,
    p or you can pick from an exciting range of sources
  br
  #links
    ul 
      li
        router-link(to='data/csv')
            icon(name='folder-open' scale=4)
            p get data from CSV file
      li
        //- router-link(to='data/fb') 
        icon(name='cloud' scale=4)
        p get dataset from firebase
 
  
</template>


<style lang="stylus" scoped>

.spacer 
  width 50px
  display inline-block
  text-align center

#text 
  width 600px
  padding 1rem
  background $g7

ul
  margin 0
  padding 0
  display flex
  max-width 600px
  list-style-type none
  justify-content space-around

li
  flex-grow 1
  margin 1rem 0
  padding .5rem
  background $blue
  font-size 1.05rem
  text-align center
  border-radius 5px
  border 2px solid blue
  transition 0.5s all ease
  animation throb linear 2s infinite

li:hover
  background green

h1 
  margin 0 0 1rem 0

a
  padding 2em 0
  width 300px


</style>
