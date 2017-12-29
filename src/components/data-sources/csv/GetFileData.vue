<template lang="pug">

#getFile
  input(type="file" id='browseFile' accept=".csv, text/csv" @change='getFileData')
  label(id='browseLabel' for='browseFile') 
    icon(name='upload' class='icon' scale=1.2)
    | choose a file...
  
</template>


<script>
import {EventBus} from '../../../main'

// qq import what?
// helper functions for stats?
// stats = dim: min/max/etc + cands: norm and rankings
// may want to reuse these later - oh rly?
// when? only if maxi toggled? cand removed?
// so have importable module
// one module or little subs :)
// just one, then cherry pick which to import


export default {
  methods: {
    getFileData: function(evt) {
      const file = evt.target.files[0]      
      if (file) { 
        const reader = new FileReader()
        reader.onload = e => {this.processFile(e.target.result)} 
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
                        
      const dimNames = lines[0]   // used to be 'categories'
      
      // check valid file format/contents
      if (lines.length < 3 || this.badHeaders(dimNames)) {
        // todo deal with it properly
        alert('bad file format')
        return false
      }

      // parse the raw file data
      const rawCands = lines.slice(1)    // remove first headers line
      const {candidates, alphas, rankables} = this.deStringVals(rawCands)
      // const parsedData = {dimensions, candidates, alphas, rankables}

      // 1 - qq could start make fancy dims now?
      let dimensionsMap = new Map()

      dimNames.forEach((dimName, index) => {
        let dimMap = new Map()
        dimMap.set('dimName', dimNames[index])
        dimMap.set('alpha', alphas.includes(index))
        dimMap.set('rankables', rankables.includes(index))
        dimMap.set('ID', (index == alphas[0]))  // true if first alpha dim
        dimensionsMap.set(dimName, dimMap)
      })
      console.log(dimensionsMap)
      
      
      // // 2 - qq okay, what about fancy candidates?
      // // don't do this until we know ID!
      let candsMap = new Map()

      // find first alpha dim => temp key until confirmed later
      let dimsRA = [...dimensionsMap]
        
      let foundIndex = dimsRA.findIndex((dim) => {
        return dim[1].get('alpha')
      })
      // console.log('foundI', foundIndex)

      candidates.forEach(cand => {
        let candMap = new Map()
        candMap.set('notYetID', cand[foundIndex].trim())
        
        cand.forEach((dim, j) => {
          candMap.set(dimNames[j], cand[j])
        })

        // this is where the 'key' is assigned...
        // this may change later if id changes!
        candsMap.set(cand[foundIndex].trim(), candMap)
      })
      console.log(...candsMap)

        
      // stick data in store
      const storeData = {candidates, dimensionsMap }
      this.$store.dispatch('setFileData', storeData)
      
      // and let them know it's done
      EventBus.$emit('fileParsed', 'insert payload here')
    },


    deStringVals: function(rawStringedCandidates) {
      let candidates = []
      let rankables = []
      let alphas = []
      
      // use fancier higher-order functions like map/reduce?
      rawStringedCandidates.forEach(line => {
        let cand = []
        line.forEach((value, v) => {
          if (isNaN(value)) {
            if (!alphas.includes(v)) {
              alphas.push(v)
            }
            value.trim()
          } else {
            if (!rankables.includes(v)) {
              rankables.push(v)
            }
            value = Number(value)
          }

          cand.push(value) 
        })
        candidates.push(cand)
      })
      
     return {candidates, alphas, rankables}
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
