// get info from store - oh rly?
// passed as props?
// better idea

<template lang="pug">
  
#deleteMe i'm the BuildDimData component 

</template>


<script>
import {EventBus} from '../../main'

export default {
  props: {
    catData: {type: Object},
    cands: {type: Array}
  },

  methods: {

  calcDims() {
    
    // set up dimObject constructor
    const DimObj = (spec) => {
      this.dimKey = spec.key
      this.dimName = spec.name
      this.crit = spec.crit
      this.alpha = spec.alpha
      this.ID = spec.ID
      this.dimScores = spec.dimScores
      this.normScores = []
      this.rankings = []
      this.stats = {}
    }

    // methods -> protoype?
    DimObj.prototype.calcStats = () => {
      var min = false
      var max  = false
      var mean = false
      var total = false
      var stdDev = false
      var scores = this.dimScores      

      if (!this.alpha) {
        min = Math.min(...scores)
        max = Math.max(...scores)

        var len = scores.length
        total = scores.reduce((total, score) => {
          return total + score
        }, 0)
        mean = total / len

        var sqrDiffs = scores.map(score => {
          var diff = score - mean
          return diff * diff
        })

        var sqrDiffsTotal = sqrDiffs.reduce((sum, sqD) => {
          return sum + sqD
        }, 0)  
        var meanSqD = sqrDiffsTotal / len
        stdDev = Math.sqrt(meanSqD)
      }
        this.stats = {min, max, mean, stdDev}
        return this
    }

    // another method
    DimObj.prototype.calcRankings = () => {
      // todo what about maxis?
      // [86, 7, 93, 12] => [3,1,4,2] ie 86 is 3rd, 7 is 1st...
      var rankings = []
      var scoresMap = {}
      var scores = this.dimScores
      scores.forEach((score, i) => {
        scoresMap[score] = i
      })  // => {'7':1, '12':3, '86':0, '93':2}
      let vals = Object.values(scoresMap)
      let valsL = vals.length
      vals.forEach(val => {
        rankings.push(valsL - val)
      }) // if valsL=4 and val=0 => ranking=1 for 1st, not 0

      if (this.maxi) {
        rankings.reverse()
      }

      this.rankings = rankings
      return this
    }


    DimObj.prototype.normaliseScores = () => {
      // what about maxis??? need to reverse something
      if (!this.alpha) {
        this.normScores = []
        var min = this.stats.min
        var max = this.stats.max
        var range = max - min
        this.dimScores.forEach((score) => {
          var norm = (score - min)/(range)
          this.normScores.push(norm)
        })
      } else {
        this.normScores = false
      }
      return this
    }
    
    const DimData = (myCatData, cands) => {
      myCatData.dimNames.forEach((dimName, d) => {
        let spec = {}
        spec.dimName = dimName
        spec.dimKey = d
        spec.crit = myCatData.crits.includes(d)
        spec.alpha = myCatData.alphas.includes(d)
        spec.ID = (myCatData.ID == d)
        spec.dimScores = []
        let newDim = new DimObj(spec)
        cands.forEach((cand) => {
          newDim.dimScores.push(cand[d])
        })
      })

    } 




    // for all dims
    const DimData2  = () => {
      // for each dim
    }

    // add  prototypes?

    const newDimData = new DimData()





    }

  },


  computed: {
    alphas() {
      return this.catData.alphas
    },
    dimNames() {
      return this.catData.dimNames
    },
    ID() {
      return this.catData.ID
    },
    crits() {
      return this.catData.crits
    },
    maxis() {
      return this.catData.maxis
    },
  },
  created() {
    EventBus.$on('catDataBuilt', () => {
      this.calcDims()
    })
  }
}
</script>
