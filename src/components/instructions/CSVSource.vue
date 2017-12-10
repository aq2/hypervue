<template lang="pug">

#csv
  h1 get data from csv
  p it must be in CSV format
  p with criteria headers as first row, eg:
  pre 
    | city,state,population,land area<br>
    |  seattle,WA,652405,83.9
    |  new york,NY,8405837,302.6
    |  boston,MA,645966,48.3
    |  kansas city,MO,467007,315.0
  get-file

</template>

<script>
import getfile from '../GetFile.vue'
export default {
  components: {
    'get-file': getfile
  }
}
</script>





<style lang="stylus" scoped>
#csv 
  background #aaa
  padding 5px 10px
  width 600px
  margin 0 auto

</style>



