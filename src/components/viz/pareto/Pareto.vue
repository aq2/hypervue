<template lang="pug">
  
  #pareto pareto

</template>


<script>

import {EventBus} from '../../../main'

export default {
  computed: {
    candiData() {
      return this.$store.getters.getCandiData
    }
  },

  methods: {
    main() {
      console.log('--- pareto ready ---')
      const candiData = this.candiData
      const candsL = Object.keys(candiData).length

      for (let c=0; c<candsL; c++) {
        let cand = candiData[c]
        cand.pareto = {front:-1, superiors:[], inferiors:[]}
      }

      let allSuperiors = this.calcDominances(candiData, candsL)
      // console.table(allSuperiors)
      
      // build fronts
      const fronts = this.buildFronts(allSuperiors)
      console.log(fronts)

      // now assign fronts to candidates
      const newCandidata = this.updateCands(candiData, fronts)
      console.log(newCandidata)

      // don't forget to $store all this stuff
      this.$store.dispatch('setCandiData', newCandidata)

      // ready to do viz
      // send event to header to change page
      EventBus.$emit('paretoDataBuilt')
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
              // add B to A's inferiors
              infA.push(b)
              // add A to B's superiors
              supB.push(a)            
            } else
            if (dominator == 'B') {
              infB.push(a)
              supA.push(b)
            }
          }
          // console.log(a, candA)
          allSuperiors.push(supA)
        }
        return allSuperiors
    },

    compareCands(ranksA, ranksB) {
      // candA = [f,f,1,0]
      // candB = [f,f,0,3]
      // need to return A, B or false
      
      const [firstIndex, firstWinner] = this.findFirstWinner(ranksA, ranksB)
      const dominator = this.findDominator(firstIndex, firstWinner, ranksA, ranksB)
      return dominator
    },

    findDominator(firstIndex, firstWinner, ranksA, ranksB) {
      let ranksL = ranksA.length
      for (let i=firstIndex+1; i<ranksL; i++) {
        if ((ranksA[i] > ranksB[i]) && (firstWinner == 'A')) {
          // no dominance - A was best, but now B is
          return false
        } else
        if ((ranksB[i] > ranksA[i]) && (firstWinner == 'B')) {
          // no dominance
          return false
        } 
      }
      return firstWinner
    },

    findFirstWinner(ranksA, ranksB) {
      for (let d=0, len=ranksA.length; d<len; d++) {
        if (ranksA[d] > ranksB[d]) {  // B is better
          return [d, 'B']
        } else
        if (ranksA[d] < ranksB[d]) {  // A is better
          return [d, 'A']
        }        
      }
      // must be all equal!
      return 'equal'
    },
    
    // seems overly complicated?
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
