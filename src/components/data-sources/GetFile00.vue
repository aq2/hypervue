<template lang="pug">

#getFile
  hr
  //- button get File
  input(type="file" id='browseFile' accept=".csv, text/csv" @change='gotFile')
  <label id='browseLabel' for='browseFile'> 
    <icon name='upload' class='icon' scale=1.2 />  choose a file...
  </label>
  hr

</template>



<script>
import {bus} from '../../main'

export default {
  // sorta 'global' data, each method can access with this.variableName
  // can use them in v-directives too
  data() {
    return {
      fileContents: ''
    }
  },
  // functions exclusive to this component
  // called using this.functionName
  methods: {
    gotFile: function(evt) {
      let r, f, parsedFileData
      
      if (f = evt.target.files[0]) {    // conditional variable
        r = new FileReader()
        r.onload = e => { 
          this.fileContents = e.target.result
          
          parsedFileData = this.isFileGood()
          console.log('pfd', parsedFileData)
          

          if (parsedFileData) {
            // stick data in store
            this.$store.dispatch('setFileData', parsedFileData)
            // alert('data saved')

            // now need to call something else, somehow
            // replace csv source with csvTable?
            // set event ??
            bus.$emit('fileParsed', 'insert payload here')


          } else {
            // todo error message, or do in isFileGood()?
            console.log('bad file')
            return false
          }
          
          // built data, now build cats sidebar
          // getCatData(cats, candidates)
        }
        r.readAsText(f)
      } else { 
        alert("Failed to load file")
      }  
    },

    isFileGood: function() {
      var i, j,            // loopers
      numb,                // numeric value of propery
      prop,                // property
      lines,               // lines of contents
      candsL,              // length/number of candidates
      catsLine,            // first line containing headers as string
      propname,            // name of individ property
      candidate,           // individual candidate object 
      scores=[],           //  array containing all cat values
      categories,          // array of category names
      rankables=[],
      candidates=[],       // array of candidate objects
      alphas= new Set()    // array of alpha cat values - should be set
 
      lines = this.fileContents.split('\n')
      // first line is headers - todo must have headers - check for alpha?
      catsLine = lines.shift()
      categories = catsLine.split(',')

      // now all lines are candidates, we've shifted the first line
      candsL = lines.length - 1   // the last one is blank for some reason

      // first check for at least two candidates
      if (candsL < 2) {
        // todo show error message in instructions?
        console.log('not enough candiates - need at least two')
        return false
      }
      
      // todo fugly hacky loops going on in here
      // for each rawCandidate, change into formatted candidate
      for (i=0; i<candsL; i++) {
        candidate = {}
        candidate['key'] = i
        scores = lines[i].split(',')
        candidate.scores = scores
        candidate.rankables = []
        candidate.normRank = []
        j = 0
        for (prop of scores) {
          
          propname = categories[j]
          // if prop value is alpha, trim it and add to alphas set, else just use the numeric val - FIXME: ? - alphs props being returned as Set?

          // qq HERE sort out prop and add to rankables if non alpha
          // fuck clever ternary

          numb = Number(prop)
          var isAlpha = isNaN(numb)
          
          if (!isAlpha) {
            prop = numb
          } else {
            prop = prop.trim()
          }

          // no don't do it here, it will be repeated for all cands!

          // prop = (isNaN(numb=Number(prop))) ? (prop.trim(), alphas.add(j)) : numb
          
                 
          // fugling hacky
          j = (j == categories.length - 1) ? -1 : j      
          j++
          // j = (j == catData.cats.length - 1) ? 0 : j++  // why no work
          candidate[propname] = prop

          // rankables - need to wait until they are chosen!
        }
        candidates.push(candidate)
      }
      

      

      // process rankables and alphas here qq
      // loop through cats, if alpha add to alphas else add to rankables
      // hah need to loop through candidate scores for alphas!

      // var exampleCandidateScores = candidates[0].scores
      // console.log('xCS', exampleCandidateScores)
      var scoresL = categories.length
      for (i=0;i<scoresL;i++) {
        // console.log('sc', scores[i])
        var score = Number(scores[i])
        var isAlf = isNaN(score)
        if (!isAlf) {
          rankables.push(i)
        } else {
          alphas.add(i)
        }
      }

      // ?? return better object
      var catData = {
        cats: categories,
        alphas: alphas,
        rankables: rankables,
        maxis: [],
        ID: -1
      }



      return {
        catData: catData,
        cands: candidates
      }
    } // end isFileGood
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

// input 
//   width: 0.1px
//   height 0.1px
//   opacity 0
//   overflow hidden
//   position absolutez-index -1

// input + label
//     font-size 1.25em
//     color white
//     display inline-block
//     cursor pointer

// input:focus + label,
// .input + label:hover {
//     background-color: red;
// }


</style>
