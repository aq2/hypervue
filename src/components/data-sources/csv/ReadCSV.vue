<template lang="pug">

#getFile
  input(type="file" id='browseFile' accept=".csv, text/csv" @change='readFile')
  label(id='browseLabel' for='browseFile') 
    icon(name='upload' class='icon' scale=1.2)
    | choose a file...
  
</template>


<script>
import {EventBus} from '../../../main'

export default {
  methods: {
    readFile: function(evt) {
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
      const ignores = []

      // stick data in store
      const catMeta = {dimNames, alphas}
      const candMeta = {candidates, ignores}

      this.$store.dispatch('setDimMeta', catMeta)
      this.$store.dispatch('setCandMeta', candMeta)
      
      // and let them know it's done
      EventBus.$emit('fileParsed')
    },


    deStringVals: (rawStringedCandidates) => {
      let candidates = []
      let alphas = []
      
      // todo use sets for alphas?
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


    badHeaders: (headers) => {
      const numericValues = headers.filter(h => !isNaN(h))
      // should this be a reduce? reduces down to true false
      return (numericValues === 0)
    }   
  }
}

</script>


<style lang="stylus" scoped>

#browseFile 
  opacity 0
  z-index -1
  width 0.1px
  height 0.1px
  overflow hidden
  color transparent
  position absolute

label
  background blue
  padding 0.5rem 0.25rem
  border-radius 0.5rem
  border 1px solid $g5
  animation throb linear 2s infinite
  link(0.5rem)
  &:hover
    cursor pointer
    background lightblue

.icon
  margin-right 15px
  margin-bottom -2px

</style>
