<template lang="pug">
</template>


<script>

import {EventBus} from '../../../main'

export default {

data() {
  return {
    newCD: {}
  }
},

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
    // what vars do we need?
    // all we want is the ranks
    let cands = this.candiData
    let allRankings = []
    Object.values(cands).forEach((val) => {
      allRankings.push(val.rankings)
      val.pareto = {front: -1, sups:[], infs:[]}
    })
    // is it paretod now!

    var candsWithDom = this.contest(allRankings, cands)
    console.log(candsWithDom)

    // yippee! now build up fronts
    // using all superiors - need to get this fron contest?
    // or build it?

  },

  contest(allRankings, cands) {
    var len = allRankings.length

    for (var a=0; a<len-1; a++) {
      var rankA = allRankings[a]

      for (var b=a+1; b<len; b++) {
        var rankB = allRankings[b]
        var dominator = this.compareCands(rankA, rankB)

        // need to change shared data()
        if (dominator == 'A') {
            // add B to A's inferiors
            cands[a].pareto.infs.push(b)
            // add A to B's superiors
            cands[b].pareto.sups.push(a)
          } else
          if (dominator == 'B') {
            cands[b].pareto.infs.push(a)
            cands[a].pareto.sups.push(b)
          }

      }
    }
    return cands // ?? either pass them in, or use data() - take yer pick

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


  compareCands(rankA, rankB) {
    const [firstIdx, leader] = this.getLeader(rankA, rankB)
    const dominator = this.getDominator(firstIdx, leader, rankA, rankB)
    return dominator
  },

  getDominator(firstIdx, leader, ranksA, ranksB) {
    for (let i=firstIdx+1, len=ranksA.length; i<len; i++) {
      if (((ranksA[i] > ranksB[i]) && (leader == 'A')) 
      || ((ranksB[i] > ranksA[i]) && (leader == 'B'))) {
        // no dominance
        return false
      }  // todo what happens if they're equal?
    }
    return leader
  },





},

created() {
  this.main()
}

}
</script>
