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
    const candiData = this.candiData
    this.newCD = candiData
    const candsL = Object.keys(candiData).length

    for (let c=0; c<candsL; c++) {
      let cand = candiData[c]
      cand.pareto = {front:-1, superiors:[], inferiors:[]}
    }

    this.calcDominances(candiData)
    // have func that returns sups and infs?

    // let [newCandiData, allSuperiors] = this.calcDominances(candiData, candsL)
    
    // this.newCD = newCandiData
    // // build fronts
    // const fronts = this.buildFronts(allSuperiors)
    // // now assign fronts to candidates
    // const newCandidata = this.updateCands(newCandiData, fronts)
    // // add front to candMeta
    // let candMeta = this.candMeta
    // candMeta.fronts = fronts


    // console.log(Object.values(this.newCD))

    // // don't forget to $store all this stuff
    // this.$store.dispatch('setCandiData', newCandidata)
    // this.$store.dispatch('setCandMeta', candMeta)

    // // send event to header to change page
    // EventBus.$emit('changePage', 8)
  },

  calcDominances(candiData) {
    // extract rankings
    let allRankings =[]
    Object.values(candiData).forEach((val) => {
      allRankings.push(val.rankings)
    })

    let allInferiors = []
    let allSuperiors = []
    console.log('------------')

    allRankings.forEach((ranking, a) => {
      var Asuperiors = []
      var Ainferiors = []
      var Bsuperiors = []
      var Binferiors = []
      var Bname
      let rankA = allRankings.pop()
      let len = allRankings.length
      // a is the last one  - ie candidata(last)
      let Aname = candiData[len].candID            
      console.log('...moving onto ' + Aname)

      allRankings.forEach((rankB, b) => {
        Bname = candiData[b].candID
        
        // let dominator = this.compareCands(rankA, rankB)

        const [firstIdx, leader] = this.getLeader(rankA, rankB)

        const dominator = this.getDominator(firstIdx, leader, rankA, rankB)
        // return dominator

        // if there is a dominator, then we have to record it
        // if A dominates, add B to As inferiors, add A to B's superiors
        if (dominator == 'A') {
          // A doms B -> A is superior to B -> B is inferior to A 
          // -> add A to B's superiors, add B to A's inferiors
          Ainferiors.push(b)
          Bsuperiors.push(a)
          console.log(Aname + '  A dominates B ' + Bname)
          // console.log(rankA, rankB)
        }
        if (dominator == 'B') {
          Binferiors.push(a)
          Asuperiors.push(b)
          console.log(Aname + ' A dominated by B ' + Bname)
          // console.log(rankA, rankB)
                   
        }
      })
      // finished with first, cand, move onto next
      console.log(Aname, 'Ai', Ainferiors)
      console.log(Aname, 'As', Asuperiors)
      console.log(Bname, 'Bi', Binferiors)
      console.log(Bname, 'Bs', Bsuperiors)
    })
    // finished with them all
  
   
    // compare rankings
    // update sups and infs
  },

  comp(candA, f) {
    // fake.forEach((f) => {
      console.log(candA + ' vs ' + f)
    // })
  },

  


  calcDominances0(candiData, candsL) {
      // compare each candidate to all others
      var allSuperiors = []
      for (let a=0; a<candsL; a++) {
        var candA = candiData[a]
        var rankA = candA.rankings
        var infA = candA.pareto.inferiors
        var supA = candA.pareto.superiors

        for (let b=a+1; b<candsL; b++) {
          var candB = candiData[b]
          var rankB = candB.rankings
          var infB = candB.pareto.inferiors
          var supB = candB.pareto.superiors
          var dominator = this.compareCands(rankA, rankB)
          
          if (dominator == 'A') {
            infA.push(b)            // add B to A's inferiors
            supB.push(a)            // add A to B's superiors
          } else
          if (dominator == 'B') {
            infB.push(a)
            supA.push(b)
          }

        }
        console.log('candA ' + candA.candID + ' :')
        console.log ('i ' + candA.pareto.inferiors + ' s ' + candA.pareto.superiors)
        allSuperiors.push(supA)

      }

      // sgould return inferiros too>
      console.log('as', allSuperiors)

      return [candiData, allSuperiors]
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
      }  // todo what happens if they're equal?
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
