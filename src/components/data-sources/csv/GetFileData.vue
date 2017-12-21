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
        const reader = new FileReader()
        reader.onload = e => { this.processFile(e.target.result) } 
        reader.readAsText(file)
      } else {
        alert('failed to load file')
      }
    }, 
    
    processFile: function(file) {
      const lines = file
                      .trim()       // remove last empty line
                      .split('\n')                    
                      .map(line => line.split(','))   
                        
      const dimensions = lines[0]

      if (lines.length < 3 || this.badHeaders(dimensions)) {
        // todo deal with it properly
        alert('bad file format')
        return false
      }

      const stringedValues = lines.slice(1)    // first line is headers
            
      const {alphas, rankables, candidates} = this.deStringValues(stringedValues)

      const parsedData = {dimensions, alphas, candidates}
      // stick it in store
      this.$store.dispatch('setFileData', parsedData)
      // and let them know it's done
      EventBus.$emit('fileParsed', 'insert payload here')
    },


    deStringValues: function(stringedValues) {
      var rankables = []
      var candidates = []
      var alphas = new Set()
      
      stringedValues.forEach((line, i) => {
        let cand = []
        line.forEach(value => {
          isNaN(value) ? (
            alphas.add(i),
            value.trim()
          ) : (
            rankables.push(i), // todo need?
            value=Number(value)
          )
          
          cand.push(value) 
        })
        candidates.push(cand)
      })

      return {alphas, rankables, candidates}
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
  background #36b

#browseFile 
  opacity 0
  z-index -1
  width 0.1px
  height 0.1px
  overflow hidden
  color transparent
  position absolute

label 
  color white
  padding .5em
  cursor pointer
  font-size 1.2em
  background #36b
  border-radius 5px
  display inline-block
  border 1px solid transparent

label:hover
  background #47c
  border 1px solid darkblue

.icon
  margin-right 15px
  margin-bottom -2px

</style>
