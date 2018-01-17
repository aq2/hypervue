<template lang="pug">
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
    let cands = this.candiData

    // let cands2 = [...cands]
    // console.log(cands)

    let allRankings = []
    Object.values(cands).forEach((val) => {
      allRankings.push(val.rankings)
      val.pareto = {front: -1, sups:[], infs:[]}
    })

    // find infs and sups
    var candsWithDom = this.contest(allRankings, cands)
    // console.log(candsWithDom)  
    // qq no superiors??
    
    let allSups = []
    Object.values(candsWithDom).forEach((cand) => {
      console.log(cand)
      console.log('c.p', cand.pareto)
      console.log('c.p.s', cand.pareto.sups)
      allSups.push(cand.pareto.sups)
    })
    // console.table(allSups)
    // qq eh?but we have them now?
    // where the fuck do they come from?


    let newFronts = this.buildFronts(allSups)

    const newCandidata = this.updateCands(candsWithDom, newFronts)
    let candMeta = this.candMeta
    candMeta.fronts = newFronts

    // console.log(newFronts)

    // now store this stuff!
    this.$store.dispatch('setCandiData', newCandidata)
    this.$store.dispatch('setCandMeta', candMeta)

    // send event to header to change page
    EventBus.$emit('changePage', 8)
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
          // console.log('dom', dominator)
      }
    }
    // console.log('contest', cands)
    // qq no sups?
    return cands
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

  findNonDominated(allSups) {
    var nonDoms = []
    allSups.forEach((sup, c) => {
      if (sup.length == 0) {
        nonDoms.push(c)
        console.log('pushing ', c)
      }
    })
    return nonDoms
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
  },
},

created() {
  this.main()
}

}
</script>
