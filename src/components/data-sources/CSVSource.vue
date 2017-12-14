<template lang="pug">

#csv
  #get(v-if='!fileGot && !dataBuilt')
    h1 get data from csv
    p it must be in CSV format
    p with criteria headers as first row, eg:
    pre 
      | city,state,population,land area<br>
      |  seattle,WA,652405,83.9
      |  new york,NY,8405837,302.6
      |  boston,MA,645966,48.3
      |  kansas city,MO,467007,315.0
    get-file-data
  #build(v-if='fileGot')
    build-candidata
  #save(v-if='dataBuilt')
    save-csv-to-fb

</template>

//qq
<script>
import {eventBus} from '../../main'
import GetFileData from './GetFileData.vue'
import BuildCandiData from './BuildCandiData.vue'
import SaveCSVToFB from './SaveCSVtoFB.vue'

export default {
  components: {
    'get-file-data': GetFileData,
    'build-candidata': BuildCandiData,
    'save-csv-to-fb': SaveCSVToFB
  },
  data() {
    return {
      fileGot: false,
      dataBuilt: false
    }
  },
  created() {
    eventBus.$on('fileParsed', (data) => {
      // console.log(data)
      // alert('event heard!')
      this.fileGot = true
    }),
    eventBus.$on('dataBuilt', (data) => {
      // console.log(data)
      // alert('event heard!')
      this.dataBuilt = true
      this.fileGot = false // ??
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
  // margin 0 auto


</style>



