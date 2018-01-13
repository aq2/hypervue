<template lang="pug">

#page
  #get(v-if='!fileGot && !dataBuilt')
    h1 get data from csv
    .v
    
    icon(name='file-text-o' scale=8)
    .v

    #text
      p Must be in CSV format,
      p with criteria headers as first row, eg:
      pre 
        | city,state,population,land area<br>
        |  seattle,WA,652405,83.9
        |  new york,NY,8405837,302.6
        |  boston,MA,645966,48.3
        |  kansas city,MO,467007,315.0
    .v

    #button  
      ReadCSV      
      
  // does this need to be in its own div?
  GetMetaData(v-if='fileGot')
    
  // todo!
  SaveCSVtoFB(v-if='dataBuilt')

</template>


<script>

import {EventBus} from '../../../main'
import ReadCSV from './ReadCSV.vue'
import GetMetaData from './GetMetaData.vue'
import SaveCSVToFB from './SaveCSVtoFB.vue'

export default {
  components: {
    ReadCSV,
    GetMetaData,
    SaveCSVToFB
  },
  data() {
    return {
      fileGot: false,
      dataBuilt: false
    }
  },
  created() {
    EventBus.$on('fileParsed', () => {
      this.fileGot = true
    }),
    EventBus.$on('dataBuilt', () => {
      this.dataBuilt = true
    }),
    EventBus.$emit('changeDataTitle', 'CSV Data')
  }
}

</script>

