<template lang="pug">
  
#deleteMe i'm the BuildDimData component 

</template>


<script>

import {EventBus} from '../../main'

export default {
  
  methods: {

    main(allDaMeta) {
      const {dimMeta, candMeta} = allDaMeta

      const dimData = this.buildAllDimData(dimMeta, candMeta)
      // console.log(dimData)

      // now build candidata
      const candiData = this.buildCandiData(candMeta, dimData, dimMeta)
      console.log(candiData)

      // store em
      this.$store.dispatch('setDimData', dimData)
      this.$store.dispatch('setCandiData', candiData)

      // now what?

      // want to save it to firebase??

      // choose Viz?
    },

    buildAllDimData(dimMeta, candMeta) {
      const {alphas, crits, dimNames, ID, maxis} = dimMeta
      const {candidates, ignores} = candMeta

      let allDimData = {}
      
      dimNames.forEach((dimName, d) => {
        const alpha = alphas.includes(d)
        const crit = crits.includes(d)
        const maxi = maxis.includes(d)
        const isID = (d == ID)
        
        // need scores from each cand
        let scores = []
        candidates.forEach((cand, c) => {
          let score = cand[d]
          if (ignores.includes(c)) {
            score = false
          }
          scores.push(score)
        })

        let stats = false
        let rankings = false
        let norm = false
        if (!alphas.includes(d)) {
          stats = this.calcStats(scores)
          rankings = this.calcRankings(scores)
          norm = this.normaliseScores(scores)
        }
        
        const dimData = {
          dimName, alpha, crit, maxi, isID, scores, norm, rankings, stats
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
  
    buildCandiData(candMeta, dimData, dimMeta) {
      // each candidate has candObj
      // candID
      // scores
      // rankings
      // norm?
      // ignored
      const {candidates, ignores} = candMeta
      const {ID, alphas, crit, dimNames, maxis} = dimMeta

      let candiData = {}
      candidates.forEach((cand, c) => {
        const candID = cand[ID]
        const scores = cand
        const ignored = (ignores.includes(c))

        // build rankings, for each dimension
        let rankings = []
        let norm = []
        Object.entries(dimData).forEach(([d, dimObj])=> {
          // console.log(d, dimObj)
          let rankForDim = false
          let normForDim = false
          if (dimObj.crit) {
            rankForDim = dimObj.rankings[c]
            normForDim = dimObj.norm[c]
          }
          rankings.push(rankForDim)
          norm.push(normForDim)
        })



        const candObj = {candID, scores, rankings, norm, ignored}
        candiData[c] = candObj
      })
      return candiData
    }


    

  },


 
  created() {
    EventBus.$on('catMetaBuilt', (allDaMeta) => {
      this.main(allDaMeta)
    })
  }
}
</script>
