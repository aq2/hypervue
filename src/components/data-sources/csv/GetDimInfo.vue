<template lang='pug'> 
  
#BuildCandidata
  h1 category meta-data
  fieldset
    legend(class='title') please select...
    #exampleTable
      #catNames
        fieldset
          legend category
          .list(v-for='(dimName, i) in dimNames' :id='i') {{dimName}}
      //

      #exampleData
        fieldset
          legend example
          .list(v-for='(score,i) in cands[0]'
            @mouseover='hi(i)' @mouseleave='unhi(i)'
          ) {{score}}
      // 
      
      // load rankables sub-comp, passing in props
      #rankables
        Rankables(:dimNames='dimNames' :alphas='alphas')

      #maxis(v-if='step>0')
        Maxis(:dimNames='dimNames' :crits='crits')

      #ID(v-if='step > 1')
        ID(:dimNames='dimNames' :firstAlpha='firstAlpha')
    //

  BuildDimData(:catData='newCatData' :cands='cands' v-show='step > 2')
  //

  // - dynamic components? slots? could be part of maxis etc
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
      p so it's best to chose an alpha-numeric name
      p press OK when done
      button(@click='gotID') OK
    //

  //

//

</template>


<script>

import {EventBus} from '../../../main'
import Maxis from './Maxis'
import Rankables from './Rankables'
import ID from './ID'
import BuildCandiData from '../../builders/BuildCandiData'
import BuildDimData from '../../builders/BuildDimData'

export default {
  data() {
    return {
      steps: ['rankable', 'maxi', 'ID'],
      step: '0',
      maxis: [],
      ID: null,
      crits: []
    }
  },

  components: {
    Maxis,
    Rankables,
    ID,
    BuildCandiData,
    BuildDimData
  },
  
  computed: {
    catData() {
      return this.$store.getters.getCatData
    },
    cands() {
      return this.$store.getters.getCands
    },
    alphas() {
      return this.catData.alphas
    },
    firstAlpha() {
      return this.catData.alphas[0]
    },
    dimNames() {
      return this.catData.dimNames
    },
    newCatData() {
      const alphas = this.alphas
      const crits = this.crits
      const dimNames = this.dimNames
      const ID = this.ID
      const maxis = this.maxis
      return {alphas, crits, dimNames, ID, maxis }
    }
  },
  
  methods: {
    hi: (i) => {
      document.getElementById(i).style.color = 'white'
    },
    unhi: (i) => {
      document.getElementById(i).style.color = 'black'
    },
    checkRankables() {
      // must be at least two crits
      if (this.crits.length > 1) {
        this.step = 1
      } else {
        alert('not enough rankables - need at least one!')
      }
      
    },
    checkMaxis() {
        this.step = 2
        const crits = this.crits
        const maxis = this.maxis

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
    gotID() {
      this.step = 3      
      this.$store.dispatch('setCatData', this.newCatData)

      // do i build dimData out of catData?
      // don't need norms for all vizzes
      // but deffo for parallel
      // but then there's the problem about eligibilty
      // maybe need inelgibles [] in CandData

      const dimData = this.buildAllDimData() 

      // send IDgot event
      // EventBus.$emit('catDataBuilt')

      // buildDimData listens and responds
      // then calls buildCandData
    },
    buildAllDimData() {
      let allDimData = {}
      this.dimNames.forEach((dimName, d) => {
        const alpha = this.alphas.includes(d)
        const crit = this.crits.includes(d)
        const maxi = this.maxis.includes(d)
        const ID = (d == this.ID)
        
        // need scores from each cand
        let scores = []
        this.cands.forEach((cand) => {
          scores.push(cand[d])
        })

        const dimData = {dimName, alpha, crit, maxi, ID, scores}
        allDimData[d] = dimData
      })
      console.log(allDimData)
      return allDimData
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
      
    }    
  },

    
  created() {
    this.dimNames.forEach((d, i) => {
      if(!this.alphas.includes(i)) {
        this.crits.push(i)}  
    })
    
    this.ID = this.alphas[0]

    // todo fugly - use Sets?
    EventBus.$on('updateCrits', (i) => {
      if (this.crits.includes(i)) {
        const iIdx = this.crits.indexOf(i)
        this.crits.splice(iIdx, 1)
      } else {
        this.crits.push(i)
        this.crits.sort()
      }
    })

    // todo repeated code?    
    EventBus.$on('updateMaxis', (i) => {
      const maxs = this.maxis
      if (maxs.includes(i)) {
        maxs.splice(maxs.indexOf(i), 1)
      } else {
        maxs.push(i)
        maxs.sort()   // need sorting? not really
      }
      this.maxis = maxs
    })

    EventBus.$on('updateID', (i) => {
      this.ID = i
    })
  }
}

</script>


<style lang="stylus" scoped>

@import 'inputs'

#exampleTable 
  display flex
  padding 1rem 0
  // justify-content space-between
  
  > div
    flex-basis 160px

#exampleTable > div:last-child fieldset
  margin-right 0
  background $g5

#catNames .list 
  font-weight bold
  transition 1s all
  // speckly bug ??

#instructions 
  margin 1rem 0
  background $g5
  padding 0.5rem 1rem


</style>

<style lang="stylus">

#exampleTable > div:last-child fieldset legend
  background $g8

</style>
