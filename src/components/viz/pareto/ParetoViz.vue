<template lang="pug">

#pViz  
  #sidebar
    TheSidebar

  #viz
    .front(v-for='(front,f) in fronts') 
      .node(v-for='node in front' :ID='node') {{candName(node)}}
        .value(:ID="'nodeSpan'+node")

</template>


<script>

import {EventBus} from '../../../main'
import TheSidebar from '../sidebar/Sidebar'

export default {

components: {
  TheSidebar
},

computed: {
  candiData() {
    return this.$store.getters.getCandiData
  },
  candMeta() {
    return this.$store.getters.getCandMeta
  },
  fronts() {
    return this.candMeta.fronts
  },
  dimMeta() {
    return this.$store.getters.getDimMeta
  }
  
},

data() {
  return {
    orderMethod: "score",
    colourMethod: "score"    
  }
},

methods: {
  main() {
    EventBus.$emit('changeTitle', 'Pareto Dominance Plot')
    this.orderAllNodes()
    this.colourAllNodes()
  },
  
  orderAllNodes() {
    Object.keys(this.candiData).forEach(key => {
      this.orderNodes(key)
    })
  },

  colourAllNodes() {
    Object.keys(this.candiData).forEach(key => {
      this.colourNodes(key)
    })
  },
  
  candName(c) {
    return this.candiData[c].candID
  },

  colourNodes(c) {
    let candiData = this.candiData
    const candsL = Object.keys(candiData).length

    let cand = candiData[c]
    let score, normScore

    if (this.colourMethod == 'rank') {
      score = cand.meanRank
      // aveRanking spreads from 0 to 100 ??
      normScore = score * 100 / candsL
    } else 
    if (this.colourMethod == 'score') {
      score = cand.meanNorm
      // norm ranking spreads from 0 to 100?
      normScore = score * 100     
    }

    let nodeEl = document.getElementById(c)
    nodeEl.style.background = 'hsla(230, 60%, ' + (100-normScore) + '%, 0.9'

    if (normScore > 50) {
      nodeEl.style.color = 'grey'
    }
  },

  orderNodes(c) {
    let candiData = this.candiData
    const candsL = Object.keys(candiData).length
    let cand = candiData[c]
    let score, normScore

    if (this.orderMethod == 'rank') {
      score = cand.meanRank
      // aveRanking spreads from 0 to 113 ??
      normScore = score * 100 / candsL
    } else 
    if (this.orderMethod == 'score') {
      score = cand.meanNorm
      // norm ranking spreads from 0 to 100?
      normScore = score      
    }
    let nodeEl = document.getElementById(c)
    nodeEl.style.order = parseInt(normScore)
  },

  showDimValues(d) {
    // show dim stats for each node
    const candiData = this.candiData
    Object.entries(candiData).forEach(([c, cand]) => {
      // get normalised score for dimension for candidate
      const myNorm = cand.norm[d]

      // change span width of each candidate
      const nodeSpan = document.getElementById('nodeSpan'+c)
      nodeSpan.style.width = (myNorm*100) + '%'
      nodeSpan.innerHTML = this.dimMeta.dimNames[d] + ':' + cand.scores[d]
    })
  },

  // todo - yuck?
  orderBy(meth) {
    this.orderMethod  = meth
    this.orderAllNodes()
  },

  colourBy(meth) {
    this.colourMethod  = meth
    this.colourAllNodes()
  }

},

created() {
  EventBus.$on('showDimValues', (d) => {
      this.showDimValues(d)
  }),

  EventBus.$on('orderBy', (meth) => {
      this.orderBy(meth)
  }),

  EventBus.$on('colourBy', (meth) => {
      this.colourBy(meth)
  })
},

mounted() {
  this.main()
}

}

</script>


<style lang="stylus" scoped>

#pViz 
  display flex  // sideways
  height 90vh
  
#sidebar 
  position relative
  top -30px
  height 95vh

#viz
  margin 0
  margin-top .5rem

.front
  margin-bottom 3rem
  display flex
  flex-wrap wrap
  justify-content space-evenly

.node
  flex-grow 1
  width 140px
  max-width 140px
  height 2.5rem
  border 2px solid $g3
  border-radius 0.5rem
  margin-bottom 0.2rem
  text-align center
  padding 0.05rem
  font-size 0.9rem

.value
  background green
  color #222

</style>
