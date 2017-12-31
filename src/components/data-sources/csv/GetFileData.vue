<template lang="pug">

#getFile
  input(type="file" id='browseFile' accept=".csv, text/csv" @change='getFileData')
  label(id='browseLabel' for='browseFile') 
    icon(name='upload' class='icon' scale=1.2)
    | choose a file...
  
</template>


<script>
import {EventBus} from '../../../main'

export default {
  methods: {
    getFileData: function(evt) {
      const file = evt.target.files[0]      
      if (file) { 
        const rdr = new FileReader()
        rdr.onload = e => {this.processFile(e.target.result)} 
        rdr.readAsText(file)
      } else {
        alert('failed to load file')
      }
    }, 
    
    processFile: function(file) {
      const lines = file
                      .trim()       // remove last empty line
                      .split('\n')                    
                      .map(line => line.split(','))   
                        
      const dimNames = lines[0]
      
      // check valid file format/contents
      if (lines.length < 3 || this.badHeaders(dimNames)) {
        // todo deal with it properly
        alert('bad file format')
        return false
      }

      // parse the raw candidates from file
      const rawCands = lines.slice(1)    // remove first headers line
      const {candidates, alphas} = this.deStringVals(rawCands)
                  
      // stick data in store
      const storeData = {dimNames, candidates, alphas}
      this.$store.dispatch('setFileData', storeData)
      
      // and let them know it's done
      EventBus.$emit('fileParsed', 'insert payload here')
    },


    deStringVals: function(rawStringedCandidates) {
      let candidates = []
      let alphas = []
      
      // use fancier higher-order functions like map/reduce?
      rawStringedCandidates.forEach((line) => {
        let cand = []
        
        line.forEach((value, v) => {
          if (isNaN(value)) {
            if (!alphas.includes(v)) {
              alphas.push(v)
            }
            value.trim()
          } else {
            value = Number(value)
          }
          cand.push(value) 
        })
        
        candidates.push(cand)
      })
      return {candidates, alphas}
    },


    badHeaders: function(headers) {
      const numericValues = headers.filter((h) => { return !isNaN(h) })
      // should this be a reduce? reduces down to true false
      return (numericValues === 0)
    }   
  }
}

</script>


<style lang="stylus" scoped>

input
  background #36b     // todo replace with global color variable

#browseFile 
  opacity 0
  z-index -1
  width 0.1px
  height 0.1px
  overflow hidden
  color transparent
  position absolute

label 
  color white           // todo - see above
  padding .5em
  cursor pointer
  font-size 1.2em
  background #36b     // todo - see above
  border-radius 5px     // rems  - mixin, global mixin>
  display inline-block
  border 1px solid transparent

label:hover
  background #47c     // todo - see above
  border 1px solid darkblue

.icon
  margin-right 15px
  margin-bottom -2px

</style>
