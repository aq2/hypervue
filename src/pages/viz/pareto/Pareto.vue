<template lang="pug">
  
  #pareto pareto

</template>


<script>

import {EventBus} from '../../../main'

export default {

computed: {
  candiData() {
    return this.$store.getters.getCandiData
  },
  
  candMeta() {
    return this.$store.getters.getCandMeta
  }
},

methods: {
  main() {
    const candiData = this.candiData
    const candsL = Object.keys(candiData).length

    for (let c=0; c<candsL; c++) {
      let cand = candiData[c]
      cand.pareto = {front:-1, superiors:[], inferiors:[]}
    }

    let allSuperiors = this.calcDominances(candiData, candsL)
    
    // build fronts
    const fronts = this.buildFronts(allSuperiors)
    // now assign fronts to candidates
    const newCandidata = this.updateCands(candiData, fronts)
    // add front to candMeta
    let candMeta = this.candMeta
    candMeta.fronts = fronts

    // don't forget to $store all this stuff
    this.$store.dispatch('setCandiData', newCandidata)
    this.$store.dispatch('setCandMeta', candMeta)

    // send event to header to change page
    // EventBus.$emit('paretoDataBuilt')
    EventBus.$emit('changePage', 'vizPareto' )
  },

  calcDominances(candiData, candsL) {
      // compare each candidate to all others
      let allSuperiors = []
      for (let a=0; a<candsL; a++) {
        const candA = candiData[a]
        const rankA = candA.rankings
        let infA = candA.pareto.inferiors
        let supA = candA.pareto.superiors

        for (let b=a+1; b<candsL; b++) {
          const candB = candiData[b]
          const rankB = candB.rankings
          let infB = candB.pareto.inferiors
          let supB = candB.pareto.superiors
          const dominator = this.compareCands(rankA, rankB)
          
          if (dominator == 'A') {
            infA.push(b)            // add B to A's inferiors
            supB.push(a)            // add A to B's superiors
          } else
          if (dominator == 'B') {
            infB.push(a)
            supA.push(b)
          }
        }
        allSuperiors.push(supA)
      }
      return allSuperiors
  },

  compareCands(ranksA, ranksB) {
    const [firstIdx, leader] = this.getLeader(ranksA, ranksB)
    const dominator = this.getDominator(firstIdx, leader, ranksA, ranksB)
    return dominator
  },

  getDominator(firstIdx, leader, ranksA, ranksB) {
    for (let i=firstIdx+1, len=ranksA.length; i<len; i++) {
      if (((ranksA[i] > ranksB[i]) && (leader == 'A')) 
      || ((ranksB[i] > ranksA[i]) && (leader == 'B'))) {
        // no dominance
        return false
      }
    }
    return leader
  },

  getLeader(ranksA, ranksB) {
    for (let d=0, len=ranksA.length; d<len; d++) {
      if (ranksA[d] > ranksB[d]) {  // B is better at first
        return [d, 'B']
      } else
      if (ranksA[d] < ranksB[d]) {  // A is better
        return [d, 'A']
      }        
    }
    // must be all equal!
    return 'equal'
  },
  
  // seems overly complicated? - recursion?
  buildFronts(allSups) {
    let fronts = []
    let allCands = new Set()
    
    for (let i=0, l=allSups.length; i<l; i++) {
      allCands.add(i)
    }

    while (allCands.size > 0) {
      let front = []
      let aCA = [...allCands]
    
      // find non-dominated candidates
      aCA.forEach(c => {
        if (allSups[c].length == 0) {
          front.push(c)
          allCands.delete(c)
        }
      })
      
      fronts.push(front)

      // remove front members from other sups
      front.forEach(f => {
        allCands.forEach(c => {
          const index = allSups[c].indexOf(f)
          if (index != -1) {
            allSups[c].splice(index, 1)
          }
        })
      })
    }  // end while
    return fronts
  },

  updateCands(candiData, fronts) {
    fronts.forEach((front, f) => {
      front.forEach(peer => {
        candiData[peer].pareto.front = f
        candiData[peer].pareto.peers = front
      })  
    })
    return candiData
  }
},

created() {
  this.main()
}

}

</script>
