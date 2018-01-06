<template lang="pug">
  
  #pareto pareto

</template>


<script>

export default {
  data() {
    return {

    }
  },
  
  components: {

  },

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
      
      // loop through candidata, adding pareto.sup and .inf
      for (let c=0; c<candsL; c++) {
        let cand = candiData[c]
        cand.pareto = {front:-1, superiors:[], inferiors:[]}
      }

      // compare each candidate to all others
      for (let a=0; a<candsL; a++) {
        const candA = candiData[a]
        const rankA = candA.rankings
        
        for (let b=a+1; b<candsL; b++) {
          const candB = candiData[b]
          const rankB = candB.rankings
          const dominator = this.compareCands(rankA, rankB)
          
          if (dominator == 'A') {
            // add B to A's inferiors
            candA.pareto.inferiors.push(b)
            // add A to B's superiors
            candB.pareto.superiors.push(a)            
          } else
          if (dominator == 'B') {
              candB.pareto.inferiors.push(a)
              candA.pareto.superiors.push(b)
          }
        }
        console.log(a, candA)        
      }

      // build fronts

    
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
  }
  

  },
  created() {
    this.main()
  }
}

</script>


<style lang="stylus" scoped>

</style>
