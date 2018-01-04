<template lang='pug'> 
  
#BuildCandidata
  h1 category meta-data
  fieldset
    legend(class='title') please select...
    #exampleTable
      #catNames
        fieldset
          legend category
          .list(v-for='(dimName,i) in dimNames' :id='i') {{dimName}}
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

      #ID(v-if='step>1')
        ID(:dimNames='dimNames' :firstAlpha='firstAlpha')
    //

  BuildDimData(:dimData='newCatData' :candiData='cands' v-show='step>2')
  //

  // - dynamic components? via events payload
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
      step: 0,
      crits: [],
      maxis: [],
      ID: null
    }
  },

  components: {
    Rankables,
    Maxis,
    ID,
    BuildCandiData,
    BuildDimData
  },
  
  computed: {
    candiData() {
      return this.$store.getters.getCandiData
    },
    cands() {
      return this.candiData.candidates
    },
    dimData() {
      return this.$store.getters.getDimData
    },    
    alphas() {
      return this.dimData.alphas
    },
    firstAlpha() {
      return this.dimData.alphas[0]
    },
    dimNames() {
      return this.dimData.dimNames
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
    hi: i => {
      document.getElementById(i).style.color = 'white'
    },
    unhi: i => {
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

        // need to make sure maxi is in rankable
        maxis.forEach(max => {
          if (!crits.includes(max)) {
            alert('maxi not in rank')
            // todo deal with it!
          }
        })
    },
    gotID() {
      this.step = 3      
      this.$store.dispatch('setDimData', this.newCatData)


      const allDimData = this.buildAllDimData() 
      console.log(allDimData)
      
      // qq
      // have all buildData stuff in component
      // send an event
      // buildData listens to it
      // builds data and $stores it
      
      // take into account eligible candidates
      // need ineligibles[] 
      // norm/stats/ranking needs to check?, or removed from scores?
      // oooh implications!
      // scores=[84,302,48,315], rankings=[1,2,0,3]
      // remove 84 -> rkgs=[f,1,0,2]




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

        let stats = false
        let rankings = false
        let norm = false
        if (!this.alphas.includes(d)) {
          stats = this.calcStats(scores)
          rankings = this.calcRankings(scores)
          norm = this.normaliseScores(scores)
        }
        
        const dimData = {
          dimName, alpha, crit, maxi, ID, scores, norm, rankings, stats
        }
        allDimData[d] = dimData
      })

      return allDimData
    },

    calcStats(scores) {
      const min = Math.min(...scores)
      const max = Math.max(...scores)

      const len = scores.length
      const total = scores.reduce((total, score) => {
        return total + score
      }, 0)
      const mean = total / len

      const sqrDiffs = scores.map(score => {
        const diff = score - mean
        return diff * diff
      })

      const sqrDiffsTotal = sqrDiffs.reduce((sum, sqD) => {
        return sum + sqD
      }, 0)  
      const meanSqD = sqrDiffsTotal / len
      const stdDev = Math.sqrt(meanSqD)
      
      const stats = {min, max, mean, stdDev}
      return stats
    },

    calcRankings(scores) {
      let rankings = []
      const sorted = [...scores].sort((a,b) => {return a-b})
      
      scores.forEach((score, i) => {
        let rank = sorted.indexOf(scores[i])
        rankings.push(rank)
      })
      
      return rankings
    },
    
    normaliseScores(scores) {
      // what about maxis??? need to reverse something
      if (!this.alpha) {
        let normScores = []
        const min = Math.min(...scores)
        const max = Math.max(...scores)
        const range = max - min
        
        scores.forEach((score) => {
          const norm = (score - min)/(range)
          normScores.push(norm)
        })
        return normScores
      }
      return false 
    },
  },
    
  created() {
    this.ID = this.alphas[0]

    this.dimNames.forEach((d, i) => {
      if(!this.alphas.includes(i)) {
        this.crits.push(i)}  
    })

    // todo fugly - use Sets?
    EventBus.$on('updateCrits', i => {
      if (this.crits.includes(i)) {
        const iIdx = this.crits.indexOf(i)
        this.crits.splice(iIdx, 1)
      } else {
        this.crits.push(i)
        // this.crits.sort()
      }
    })

    // todo repeated code?    
    EventBus.$on('updateMaxis', i => {
      const maxs = this.maxis
      if (maxs.includes(i)) {
        maxs.splice(maxs.indexOf(i), 1)
      } else {
        maxs.push(i)
        // maxs.sort()   // need sorting? not really
      }
      this.maxis = maxs
    })

    EventBus.$on('updateID', i => {
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
