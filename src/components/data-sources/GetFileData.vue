<template lang="pug">

#getFile
  hr
  input(type="file" id='browseFile' accept=".csv, text/csv" @change='getFileData')
  label(id='browseLabel' for='browseFile') 
    icon(name='upload' class='icon' scale=1.2)
    | choose a file...
  hr
  
</template>


<script>
import {bus} from '../../main'

export default {
  data() {
    return {
      fileContents: '',
      categories: [],
      candidates: [],
      candidateStrings: []
    }
  },
  methods: {
    // called by upload button
    // change name to ?
    // what does it do exactly?
    // it gets the button event, checks for headers and cands
    // parses file, then dispatches to store - OMG
    getFileData: function(evt) {
      var r,                  // file reader ? - rename it
          f,                  // file read in
          parsedFileData         // boolean for file worthiness

      if (f = evt.target.files[0]) {    // conditional variable
        
        r = new FileReader()
        r.onload = e => {
          this.fileContents = e.target.result

          if (this.fileIsGood()) {
            parsedFileData = this.parseFile()
            this.catData = parsedFileData.catData
            this.candidates = parsedFileData.cands

            // stick data in store
            this.$store.dispatch('setFileData', parsedFileData)
            // and let them know it's done
            bus.$emit('fileParsed', 'insert payload here')
          } else {
            alert('bad format')
            // todo deal with it!
          }
        } 
      r.readAsText(f)
      } else {
        alert('failed to load file')
      }
    },
    fileIsGood: function() {
      var lines = [],          // all lines in the file
          catsLine,            // first line with headers/cats
          candsL               // how many candidates - eg rest of lines

      lines = this.fileContents.split('\n')
      // first line is headers 
      // todo must have headers - check for alpha?
      catsLine = lines.shift()
      this.categories = catsLine.split(',')

      // get rid of last empty entry
      lines.pop()
      this.candidateStrings = lines
      // now all remaining lines are candidates
      candsL = lines.length - 1   // the last one is blank for some reason

      // first check for at least two candidates
      if (candsL < 2) {
        // todo show error message in instructions?
        console.log('not enough candiates - need at least two')
        return false
      }
      return true
    },
    parseFile: function() {
      // for each candidate, build candidate object
      var rankables =[]
      var alphas = new Set()
      var cats = this.categories
      var candStrings = this.candidateStrings
      var candsL = candStrings.length
      var cands = []

      for (var c=0; c<candsL; c++) {
        var cand = { 
          key:c, 
          ID:null,
          scores:[]
          // rankables: []
        }
        // now build scores
        // for each word in candString, make a cat, and score?
        var words = candStrings[c].split(',')
        var wordsL = words.length
        for (var w=0; w<wordsL; w++) {
          var word = words[w]  // is it a string? alpha...
          if (isNaN(word)) {
            word = word.trim()
          } else {
            word = Number(word)
          }
          var score = {
            catNum: w,
            catName: cats[w],
            origScore: word,
            rankableScore: null,
            normalisedScore: null
          }
          cand.scores.push(score)
        }
        // console.log('cand', cand)
        cands.push(cand)
      }

      var exScores = cands[0].scores
      var scoresL = cats.length
      for (var i=0; i<scoresL; i++) {
        if (isNaN(exScores[i].origScore)) {
          alphas.add(i)
        } else {
          rankables.push(i)
        }
      }

      // ?? return better object
      var catData = {
        cats: cats,
        alphas: alphas,
        rankables: rankables,
        maxis: [],
        ID: -1
      }

      // console.group()
      //   console.log('cD', catData)
      //   console.log('cands', cands)
      // console.groupEnd()
      

      return {
        catData: catData,
        cands: cands
      }

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

</style>
