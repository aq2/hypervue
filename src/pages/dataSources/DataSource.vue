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
    button(id='csv' @click="nextPage('csv')")
      icon(name='folder-open' scale=4)
      p get data from CSV file
    button(id='firebase')
      icon(name='cloud' scale=4)
      p get data from firebase
 
  
</template>


<script>

import {EventBus} from './../../main'

export default {

methods: {

  nextPage(newPage) {
    EventBus.$emit('changePage', newPage)
  }

}
}

</script>



<style lang="stylus" scoped>

.spacer 
  width 50px
  display inline-block
  text-align center

#links
  width 600px

button
  width 275px

#firebase
  background $g3

#csv
  margin-right 50px

</style>
