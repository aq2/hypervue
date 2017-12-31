<template lang="pug">

//- transition(name='fade')
#CsvSource
    #get(v-if='!fileGot && !dataBuilt')
      h1 get data from csv
      icon(name='file-text-o' scale=8)
      
      #text
        p it must be in CSV format
        p with criteria headers as first row, eg:
        pre 
          | city,state,population,land area<br>
          |  seattle,WA,652405,83.9
          |  new york,NY,8405837,302.6
          |  boston,MA,645966,48.3
          |  kansas city,MO,467007,315.0
        GetFileData
      //

    //
  
    // does this need to be in its own div?
    GetDimInfo(v-if='fileGot')
    
    SaveCSVtoFB(v-if='dataBuilt')

</template>


<script>

import {EventBus} from '../../../main'
import GetFileData from './GetFileData.vue'
import GetDimInfo from './GetDimInfo.vue'
import SaveCSVToFB from './SaveCSVtoFB.vue'

export default {
  components: {
    GetFileData,
    GetDimInfo,
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
      this.fileGot = false // ??
    })
  }
}

</script>


<style lang="stylus" scoped>

#CsvSource
  // background #aaa
  padding 5px 10px
  // width 600px
  // margin 0 auto

#text 
  background $g5
  padding 0.5rem 1rem
  margin 1rem 0



.fade-enter-active, .fade-leave-active
  transition opacity .5s

.fade-enter, .fade-leave-to 
  opacity 0


</style>



