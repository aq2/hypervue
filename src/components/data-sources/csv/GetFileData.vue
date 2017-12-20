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
  data() {
    return {
      fileContents: '',
      categories: [],
      candidates: [],
      allCandidateStrings: [],
     
      newCands: [],                       // cands based
      newCrits: [],                       // crit (cat) based
                                          // whole thing as 2D array? = headfuck?
    }
  },
  methods: {
    getFileData: function(evt) {
      var r,                  // file reader ? - rename it
          f,                  // file read in
          parsedFileData,
          rawCsvBigString         

      //

      if (f = evt.target.files[0]) {    // conditional variable
        r = new FileReader()
        r.onload = e => {
        // this.fileContents = e.target.result
        rawCsvBigString = e.target.result

        var rawRows = rawCsvBigString.split('\n')
        rawRows.pop()               // remove last empty row
        // var unRawRows = rawRows.split(',')
        
        var rawHeaders = rawRows[0]
        var rawRowsL  = rawRows.length

        // check for headers()?
        // get first row
        // show it
        // are these headers?
          // yes -> cool
          // no -> make some
            // autoassign cat1, cat2
            // offer edit of default
            // where do i do this?
            // here or in sep fn, or wait until example table???
            // or is it essential for parsing to get rows/colums?
            // deep thought for everything!!!!!!!!!!!



        var rawFirstCand = rawRows[1]
        console.log({rawFirstCand})
        var cookedCand = rawFirstCand.split(',')
        console.log({cookedCand})
        
        

        // check for headers being alpha?
        // so need to parse that row first, on its own?
        var unrawHeaders = rawHeaders.split(',')
        // at least one is alpha, or all?, or first only?
        this.checkHeaders(unrawHeaders)


        // check for errors!
        // if ()

        // now parse this as parsed rows/cands
        // and columns too?

        // rather than functionaly passing params,
        // parse file can use this.
        // so rawRows needs to this.rawRows, part of data
        // rawString as this? easier to parse into columns?
        // don't really see why

        // console.log('rR', rawRows)
        // // console.log('uRR', unRawRows)
        // console.log('rH', rawHeaders)
        // console.log('URH', unRawHeaders)
        // console.log('rRL', rawRowsL)

          // if (this.fileIsGood()) {
          //   parsedFileData = this.parseFile()
          //   this.catData = parsedFileData.catData
          //   this.candidates = parsedFileData.cands

          //   // stick data in store
          //   this.$store.dispatch('setFileData', parsedFileData)
          //   // and let them know it's done
          //   EventBus.$emit('fileParsed', 'insert payload here')
          // } else {
          //   alert('bad format')
          //   // todo deal with it!
          // }
        } 
      r.readAsText(f)   // not sure how this works?
      } else {
        alert('failed to load file')
      }
    },
    fileIsGood: function() {
      var lines = [],          // all lines in the file
          catsLine            // first line with headers/cats

      lines = this.fileContents.split('\n')
      // first line is headers  todo must have headers - check for alpha?
      catsLine = lines.shift()
      this.categories = catsLine.split(',')

      // get rid of last empty entry
      lines.pop()
      this.allCandidateStrings = lines

      // check for at least two candidates
      if (lines.length < 3) {
        // todo show error message in instructions?
        console.log('not enough candiates - need at least two')
        return false
      }
      return true
    },
    parseFile: function() {
      // for each candidate, build candidate object
      var tots = []
      var cands = []
      var rankables =[]
      var categories = []
      var alphas = new Set()
      var cats = this.categories
      var candStrings = this.allCandidateStrings
      var candsL = candStrings.length

      // build cat array of emptys
      for (var cat=0; cat<candsL; cat++) {
      
        var name = cats[cat]
        var category = {
          values:[], min:null, max:null, total:0, mean:null, name:name, key:cat,
          rankable:null, alpha:null, maxi:null, ID:null
        }
        categories.push(category)
      }
      
      for (var c=0; c<candsL; c++) {
        var cand = { key:c, ID:null, scores:[] }
        var candString = candStrings[c].split(',')
        var stringValuesL = candString.length
        
        for (var catID=0; catID<stringValuesL; catID++) {
          var value = candString[catID]  // is it a string? alpha...
          
          if (isNaN(value)) {
            value = value.trim()
            if (c == 0) {
              alphas.add(catID)
              categories[catID].alpha = true
              categories[catID].rankable = false
              categories[catID].min = false
              categories[catID].max = false
              // categories[catID].maxi = null
            }
          } else {
            value = Number(value)
            if (c == 0) {
              categories[catID].alpha = false
              categories[catID].rankable = true
              // categories[catID].min = false
              // categories[catID].max = false
              // categories[catID].maxi = null
              rankables.push(catID)
              tots[catID] = 0
            }
            tots[catID] += value
          }
          
          categories[catID].values.push(value)
                
          var score = {
            catNum: catID,
            catName: cats[catID],
            origScore: value,
            ranking: null,
            normalisedScore: null
          }
          cand.scores.push(score)
          // categories[catID].key = catID   // todo assigning mukltiple times?
          // categories[catID].name = cats[catID]
          categories[catID].total = tots[catID]
          categories[catID].mean = tots[catID] / candsL
        }
          // alert('foo')
        cands.push(cand)
      }

      var catData = { cats, alphas, rankables, categories }

      return { catData, cands }
    },
    checkHeaders: function(headers) {
      console.log({headers})
      // var percy = this.
      // they're all gonna be strings, but maybe nor alpha - eg "123"
      // headers.forEach()
      var headersL = headers.length
      
      for (var i=0; i<headersL; i++) {
        var header = headers[i]
        console.log({header})        
      }

      headers.forEach(myFunction)
      
      function myFunction(item, index) {
        console.log({item})
        console.log({index})        
      }

      headers.forEach((item, index) => {
        console.log({item})
        console.log({index}) 
      })
      

      // return all aplha, 1 alpha or no alphas?
    }  
  }
}

</script>


<style lang="stylus" scoped>

#browseFile 
  color transparent

input
  background #36b

#browseFile 
  width 0.1px
  height 0.1px
  opacity 0
  overflow hidden
  position absolute
  z-index -1

label 
  font-size 1.2em
  color white
  display inline-block
  background #36b
  padding .5em
  border 1px solid transparent
  cursor pointer
  border-radius 5px

label:hover
    background #47c
    border 1px solid darkblue

.icon
  margin-right 15px
  margin-bottom -2px

<div id="cc"></div>
<div></div>

#ccc 
  bac
#cacaca
  ba
#cat 
  baf
</style>
