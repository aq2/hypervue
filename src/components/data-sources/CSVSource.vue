<template lang="pug">

#csv
  #main(v-if='!fileGot')
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
  #hey(v-if='fileGot')
    got-file

</template>

//qq
<script>
import {bus} from '../../main'
import getfile from './GetFile.vue'
import gotfile from './GotFile.vue'

export default {
  data() {
    return {
      fileGot: false
    }
  },
  components: {
    'get-file': getfile,
    'got-file': gotfile
  },
  created() {
    bus.$on('fileParsed', (data) => {
      // console.log(data)
      // alert('event heard!')
      this.fileGot = true
    })
  }
}

</script>




/qq
<style lang="stylus" scoped>

#csv 
  background #aaa
  padding 5px 10px
  // width 600px
  margin 0 auto

#hey 
  // min-width 800px


</style>



