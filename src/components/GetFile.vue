<template lang="pug">

#getFile
  hr
  //- button get File
  label(id='browseLabel' for='browseFile') data file...
  input(type="file" id='browseFile' accept=".csv, text/csv" @change='gotFile')
  hr

</template>



<script>
export default {
  // sorta 'global' data, each method can access with this.variableName
  // can use them in v-directives too
  data() {
    return {
      conts: ''
    }
  },
  // functions exclusive to this component
  // called using this.functionName
  methods: {
    gotFile: function(evt) {
      let r, f, parsedFile, catData = {}
      
      if (f = evt.target.files[0]) {    // conditional variable
        r = new FileReader()
        r.onload = e => { 
          this.conts = e.target.result
          parsedFile = this.isFileGood()

          if (parsedFile) {
            // store them separately or as object?
            // var cats = parsedFile.cats
            // var cands = parsedFile.cands
            // var alfs = parsedFile.alfs
            this.storeData(parsedFile)
            // console.log('cats', cats)
            // console.log('cands', cands)
            // console.log('alfs', alfs)            
          } else {
            // todo error message, or do in isFileGood()?
            console.log('bad file')
            return false
          }
          
          console.log('about to get data')
          alert('done')
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
      candidates=[],       // array of candidate objects
      alphas= new Set()    // array of alpha cat values - should be set
 
      lines = this.conts.split('\n')
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
          // if prop value is alpha, trim it and add to alphas set, else just use the numeric val
          // todo alpha check here?     
          prop = (isNaN(numb=Number(prop))) ? (prop.trim(), alphas.add(j)) : numb
          // alphas.push(j) // fixme ???
          // fugling hacky
          j = (j == categories.length - 1) ? -1 : j      
          j++
          // j = (j == catData.cats.length - 1) ? 0 : j++  // why no work
          candidate[propname] = prop

          // rankables - need to wait until they are chosen!
        }
        candidates.push(candidate)
      }
      
      // todo should return object rather than array
      return {
        cats: categories,
        cands: candidates,
        alfs: alphas
      }
    },

    storeData: function(parsedFile) {
      var cats = parsedFile.cats
      var cands = parsedFile.cands
      var alfs = parsedFile.alfs
      console.log('cats', cats)
      console.log('cands', cands)
      console.log('alfs', alfs)
      this.$store.state.categories = cats
      this.$store.state.limbo = cats
    }
  }
}
</script>



<style lang="stylus">

#browseFile 
  color transparent

</style>
