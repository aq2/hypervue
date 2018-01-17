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
    let origCands = this.candiData

    let cands = [...origCands]

    let allRankings = []
    origCands.forEach(cand => {
      allRankings.push(cand.rankings) //qq
    })

    // find infs and sups
    var candsWithDom = this.contest(allRankings, cands)


    let allSups = []
    cands.forEach((cand) => {
      const sups = [...cand.sups]  // derefernce it!
      allSups.push(sups)
    })

    // let newSups = allSups.slice(0)
    let newFronts = this.buildFronts(allSups)


    console.log('after buildFronts')    
    console.table(candsWithDom) 
    // return
    
    // const newCandidata = this.updateCands(candsWithDom, newFronts)
    
    newFronts.forEach((front, f) => {
      front.forEach(peer => {
        candsWithDom[peer].paretoFront = f
        candsWithDom[peer].peers = front
      })  
    })
    
    // console.log('after forEach')
    // console.table(candsWithDom)

    let candMeta = this.candMeta
    candMeta.fronts = newFronts
    
    // return

    // console.log(newFronts)

    // now store this stuff!
    this.$store.dispatch('setCandiData', candsWithDom)
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
            cands[a].infs.push(b)
            // add A to B's superiors
            cands[b].sups.push(a)
          } else
          if (dominator == 'B') {
            cands[b].infs.push(a)
            cands[a].sups.push(b)
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
    // let allSups = [...allSupsO]
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

  updateCands(cands, fronts) {
    fronts.forEach((front, f) => {
      front.forEach(peer => {
        cands[peer].paretoFront = f
        cands[peer].peers = front
      })  
    })
    return cands
  },

  deepClone(obj) {
  //in case of primitives
  if(obj===null || typeof obj !== "object"){
    return obj
  }

  //date objects should be 
  if(obj instanceof Date){
    return new Date(obj.getTime())
  }

  //handle Array
  if(Array.isArray(obj)){
    var clonedArr = []
    obj.forEach(function(element){
      clonedArr.push(this.deepClone(element))
    })
    return clonedArr
  }

  //lastly, handle objects
  let clonedObj = new obj.constructor()
  for(var prop in obj){
    if(obj.hasOwnProperty(prop)){
      clonedObj[prop] = this.deepClone(obj[prop])
    }
  }
  return clonedObj
}



},
created() {
  this.main()
}

}
</script>
