<template lang='pug'> 
  
#BuildCandidata
  h2 category meta data
  #exampleTable
    #catNames
      .catName category
      .list(v-for='cat in dimNames') 
        .catName {{cat}}
    //

    #exampleData
      .example example
      .list(v-for='score in cands[0]') 
        .example {{score}}
    // 
    
    // load rankables sub-comp, passing in props
    Rankables(:dimNames='dimNames' :alphas='alphas')

    // load maxis sub-comp, passing in props
    Maxis(:dimNames='dimNames' :crits='crits' v-show='step>0')

    transition(name='fade')
      #ID(v-show='step > 1')
        .id ID
        .list(v-for='(cat, index) in dimNames') 
          label 
          input(type='radio' :value='index' v-model='ID')
          .boxy
    //

  //

  // - dynamic components? slots?
  #instructions
    div(v-show='step == 0')
      p first, select orderable categories to include in rankings
      p ie don't select a non-numeric category
      p need at least two categories
      p press OK when done
      button(@click='checkRankables') OK
    //

    div(v-show='step == 1')
      p now select categories where high values are good
      p default is lower values are better
      p press OK when done
      button(@click='checkMaxis') OK
    //

    div(v-show='step == 2')
      p now select a category to use as an identifier
      p this name will be used to identify candidates
      p so chose an alpha-numeric name
      p press OK when done
      button(@click='checkID') OK
    //

    p crits {{crits}}
    p maxis {{maxis}}
    p ID {{ID}}
  //

  #feedback
    hr
    p idx {{idx}}
    p maxis {{maxis}}
//

</template>


<script>

// todo - file getting too big -> subcomponentize?
import {EventBus} from '../../../main'
import Maxis from './Maxis'
import Rankables from './Rankables'

export default {
  data() {
    return {
      steps: ['rankable', 'maxi', 'ID'],
      step: '0',
      rankables: [],
      maxis: [],
      ID: null,
      alphas: [],
      cands: [],
      numberOfDims: -1,
      idx: -1,
      maxBooleans: [],
      dimensions: [],
      dimNames: [],
      crits: []
    }
  },

  components: {
    Maxis,
    Rankables
  },
  
  computed: {
    fileData() {
      return this.$store.getters.getFileData
    }
  },
  
  methods: {
    checkRankables() {
      // must be at least two crits
      if (this.crits.length > 0) {
        this.step = 1
        // this.makeMaxBooleans()
      } else {
        alert('not enough rankables - need at least one!')
      }
    },   
    isRankable(i) {
      return this.rankables.includes(i)
    },
    isAlpha(i) {
      return this.alphas.includes(i)
    },
    checkMaxis() {
        this.step = 2
        var crits = this.crits
        var maxis = this.maxis

        // first need to make sure maxi is in rankable
        for (var max of maxis) {
          if (!crits.includes(max)) { 
            alert('maxi not in rank')
            // todo deal with it!
          }
        }        
        
        // qq JUST DONE MONSTER SESH
        // this.buildRankableScoresForCandidates()
        // this.findRankingsForCandidates()

        // normalise all the rankables!
        // this.buildNormalisedScoresForCategories()
        // this.buildNormalisedScoresForCandidates() 
        // qq

    },
    findRankingsForCandidates() {
      // todo componentize - it will be handy for ron
      // also split into smaller functions - bit of a head fuck
      // should deal with maxis somewhere - or wait for normalize?
      // var catData = this.catData
      var rankables = this.rankables
      var ranksL = rankables.length
      var dimensions = this.dimensions
      var dimsL = dimensions.length
      var allIndexedRankables = []        // qq what?
      var alphas = this.alphas      
      var alphasL = alphas.size
      this.ID = alphas.keys().next().value
      // console.log({myID})
      

      for (var a=0; a<alphasL; a++) {
        allIndexedRankables.push({rankable: false})
      }

      // for each rankable category
      // mega reduce or summat!
      for (var r=0; r<ranksL; r++) {
        var indexedRankable = []        
        var scores = dimensions[rankables[r]].values

        // build new array of [{index:0, value:6}, ... {index:3, value:4}]
        for (var cat = 0; cat<dimsL; cat++) {
          indexedRankable.push({index: cat, value: scores[cat]})
        }
        
        // then sort that by value
        indexedRankable.sort(function(a,b) {return a.value - b.value})
        // min = sorted[0], max = sorted[last]        
        dimensions[rankables[r]].min = indexedRankable[0].value
        dimensions[rankables[r]].max = indexedRankable[dimsL-1].value

        allIndexedRankables.push(indexedRankable)
      } 
      
      // can find rankings of ID via my clever method
      var cands = this.cands
      var candsL = cands.length
      // for each candidate,
      for (var cand=0; cand<candsL; cand++) {
        var candidate = cands[cand]
        // for each rankable category
        for (var ra=0; ra<ranksL; ra++) {
          // find their ranking by index (?)
          var rankingInScores  = this.findRankOfCand(cand, allIndexedRankables[rankables[ra]])
          // add ranking to scores[]
          candidate.scores[rankables[ra]].ranking = rankingInScores
        }
      }
    },
    findRankOfCand(x, values) {
      var rankOfIndex = values.find(v => v.index == x)
      return values.indexOf(rankOfIndex)
    },
    buildNormalisedScoresForCategories() {
      var categories = this.catData.categories
      var dimsL = categories.length
      var normed

      // for all categories
      for (var c=0; c<dimsL; c++) {
        var cat = categories[c]
        // if rankable
        if (cat.rankable) {
          // get values
          var values = cat.values
          // normalise them
          normed = this.normalise(values, cat.min, cat.max)
        } else {
          // else false?
          normed = false
        }
        // add them to category object
        cat.normalised = normed
      }
    },
    normalise(a, min, max) {
      var l = a.length
      var normalised = []
      for (var i=0; i<l; i++) {
        var norm = (a[i] - min) / (max - min)
        normalised.push(norm)
      }
      return normalised
    },
    buildNormalisedScoresForCandidates() {
      var cands = this.cands
      var candsL = cands.length
      var dims = this.catData.categories
      var dimsL = dims.length
      
      // for all candidates
      for (var c=0; c<candsL; c++) {
        var cand = cands[c]
      
        // for all rankable dims
        for (var i=0; i<dimsL; i++) {
          var cat = dims[i]
          if (cat.rankable) {
            // get normalised score
            var norm = cat.normalised[c]
            // add it to candidate score
            cand.scores[i].normalisedScore = norm
          } else {
            cand.scores[i].normalisedScore = false   
          }
        }

      }
    },
    checkID() {
      // alert('checkID')
      
      var ID = this.ID
      this.ID = ID
      this.step = 3
      if (ID != null) {
        var IDname = this.dimensions[ID]
        // var candID = 
        // console.log({IDname})
        
        // makeIDforCands
        // this.makeIDforCands(ID)
        // catDataID? - already set somehow ??
        
        // makeIDfordims qq
        // this.makeIDfordims(ID)
        
        // EventBus.$emit('dataBuilt')

      } else {
        // todo
        return false
      }
      
    },
    makeIDfordims(ID) {
      var categories = this.catData.categories
      var dimsL = categories.length 
      // for each category
      for (var c=0; c<dimsL; c++) {
        // set cat.ID to true or false
        var cat = categories[c]
          if (c == ID) {
            cat.ID  = true
          } else {
            cat.ID  = false            
          }
      }
    },
    makeIDforCands(ID) {
      // alert('boo')
      var cands = this.cands
      var candsL = cands.length
      // for all cands,
      for (var c=0; c<candsL; c++) {
        var cand = cands[c]
        // assign ID
        var candID = cand.scores[ID].origScore
        cand.ID = candID
      // console.log({cand})
      }
      
    },
    makeMaxBooleans() {
      // dumb way
      var rankables = this.rankables
      var dims = this.dims
      var dimsL = dims.length       
      // need to know dims length!
      // could pass, or use categories object
      // then extract fftt from categories instead
      // no expense, because data not 'passed' - non-func paradigm here!
      
      
      var rankL = rankables.length
      for (var i=0; i<dimsL; i++) {
        if (rankables.includes(i)) {
          this.maxBooleans.push(true)
        } else {
          this.maxBooleans.push(false)  //TODO: foo
        }
      }
      console.log(this.maxBooleans)
      
    }
  },

    
  created() {
    var data = this.fileData
    this.alphas = data.alphas 
    this.dimNames = data.dimNames 
    this.dimNames.forEach((d, i) => {if(!this.alphas.includes(i)) {this.crits.push(i)}  })
    
    this.cands = data.candidates
    this.ID = this.alphas[0]

    // todo fugly - use Sets?
    EventBus.$on('updateCrits', (i) => {
      if (this.crits.includes(i)) {
        var iI = this.crits.indexOf(i)
        this.crits.splice(iI, 1)
      } else {
        this.crits.push(i)
        this.crits.sort()
      }
    })

    EventBus.$on('updateMaxis', (i) => {
        console.log('maxed', i)
      if (this.maxis.includes(i)) {
        var iI = this.maxis.indexOf(i)
        this.maxis.splice(iI, 1)
      } else {
        this.maxis.push(i)
        this.maxis.sort()
      }
    })


  }
}
</script>


<style lang="stylus" scoped>

#cont 
  background #eee


.cell
  min-width 140px  // should be calculated somehow or flexboxed!
  // display inline-block
  padding  .5em 0
  margin 0
  min-height 40px

.list
  // @extend .cell
  min-width 140px  // should be calculated somehow or flexboxed!
  // display inline-block
  // padding  .5em 0
  margin 0
  background $blue
  min-height 40px
  

#top
  background orange
  padding 0
  margin 0
  
.catName
  @extend .cell  // qq css inheritance!
  background steelblue
  padding-left 10px
  font-weight bold
  
.boxy
  @extend .cell
  text-align center

.example
  @extend .cell
  padding-left: 1em
  background #ccc
 

.rankable
  @extend .cell
  background #456
  text-align center

.maxi 
  @extend .cell
  background #789
  text-align center

.id
  @extend .cell
  background #9ab
  text-align center


label
  // display none

#exampleTable 
  display flex
  // justify-content space-between
  background steelblue
  width 800px
  // flex-flow column

  >div
    // background orange
    // flex-grow 1
    // border 1px solid white
    flex-basis 160px

.fade-enter-active, .fade-leave-active
  transition all 1s

.fade-enter, .fade-leave-to 
  opacity 0
  background blue


</style>
