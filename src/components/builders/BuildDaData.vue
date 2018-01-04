<template lang="pug">
  
#deleteMe i'm the BuildDimData component 

</template>


<script>

import {EventBus} from '../../main'

export default {
  
  methods: {

    main(allDaMeta) {
      console.info(1, allDaMeta)
      const {dimMeta, candMeta} = allDaMeta
      console.log(2, dimMeta)
      console.log(3, candMeta)
    },

    // take into account eligible candidates
      // need ineligibles[] 
      // norm/stats/ranking needs to check?, or removed from scores?
      // oooh implications!
      // scores=[84,302,48,315], rankings=[1,2,0,3]
      // remove 84 -> rkgs=[f,1,0,2]


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
    EventBus.$on('catMetaBuilt', (allDaMeta) => {
      this.main(allDaMeta)
    })
  }
}
</script>
