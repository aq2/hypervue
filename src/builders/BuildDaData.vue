<template lang="pug">
  
#buildDaData 
  button(class='saveFB') save to firebase?
  .v
  button(id='built' class='throb' @click='nextPage(6)') choose Viz Type

</template>


<script>

import {EventBus} from './../main'

export default {

methods: {

  main(allDaMeta) {
    const {dimMeta, candMeta} = allDaMeta

    const dimData = this.buildAllDimData(dimMeta, candMeta)
    const candiData = this.buildCandiData(candMeta, dimData, dimMeta)

    // store em
    this.$store.dispatch('setDimData', dimData)
    this.$store.dispatch('setCandiData', candiData)

    // todo want to save it to firebase??
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
    const mean = this.mean(scores)

    const sqrDiffs = scores.map(score => {
      const diff = score - mean
      return diff * diff
    })

    const meanSqD = this.mean(sqrDiffs)
    const stdDev = Math.sqrt(meanSqD)
    
    const stats = {min, max, mean, stdDev}
    return stats
  },

  calcRankings(scores) {
    let rankings = []
    const sorted = [...scores].sort((a,b) => a-b)
    
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
        const norm = (score - min)/range
        normScores.push(norm)
      })
      return normScores
    }
    return false
  },

  buildCandiData(candMeta, dimData, dimMeta) {
    const {candidates, ignores} = candMeta
    const {ID} = dimMeta

    let candiData = []
    candidates.forEach((cand, c) => {
      const candKey = c
      const candID = cand[ID]
      const scores = cand
      const ignored = (ignores.includes(c))

      // build rankings, for each dimension
      let rankings = []
      let norm = []
      Object.entries(dimData).forEach(([d, dimObj]) => {
        let rankForDim = false
        let normForDim = false
        if (dimObj.crit) {
          rankForDim = dimObj.rankings[c]
          normForDim = dimObj.norm[c]
        }
        rankings.push(rankForDim)
        norm.push(normForDim)
      })

      const meanRank = this.mean(rankings)
      const meanNorm = this.mean(norm)

      // const pareto = {front:-1, sups:[], peers:[], infs:[]}




      const candObj = {candKey, candID, scores, rankings, meanRank, norm, meanNorm, ignored, paretoFront:-1, sups:[], peers:[], infs:[]}
      candiData.push(candObj)
    })
    return candiData
  },

  mean(arr) {
    let length = 0
    arr.forEach((a) => {
      if (a !== false) {    // ignore false elements
        length++
      }
    })
    const total = arr.reduce((total, e) => {
      return total + e
    }, 0)
    const mean = total / length
    return mean
  },

  nextPage(newPage) {
    EventBus.$emit('changePage', newPage)
  }
},

created() {
  EventBus.$on('catMetaBuilt', (allDaMeta) => {
    this.main(allDaMeta)
  })
}
}
</script>


<style lang="stylus" scoped>

.saveFB
  background $g3
  color blue


</style>
