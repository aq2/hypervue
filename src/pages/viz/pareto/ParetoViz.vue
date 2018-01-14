<template lang="pug">

#pViz
  #viz
    .front(v-for='front in fronts') 
      .node(v-for='node in front' :ID='node'
            @click='doNode(node)') {{candName(node)}}
        .value(:ID="'nodeSpan'+node")

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
    orderMethod: "rank",
    colourMethod: "rank"
  }
},

methods: {
  main() {
    EventBus.$emit('changeVizTitle', 'Pareto Dominance Plot')
    this.orderAllNodes()
    this.colourAllNodes()
  },

  $(ID) {
    return document.getElementById(ID)
  },
    
  orderAllNodes() {
    Object.keys(this.candiData).forEach(key => {
      this.orderANode(key)
    })
  },

  colourAllNodes() {
    Object.keys(this.candiData).forEach(key => {
      this.colourANode(key)
    })
  },
  
  candName(c) {
    return this.candiData[c].candID
  },

  colourANode(c) {
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

    let nodeEl = this.$(c)
    nodeEl.style.background = 'hsla(230, 60%, ' + (100-normScore) + '%, 0.9'

    if (normScore > 50) {
      nodeEl.style.color = 'grey'
    }
  },

  orderANode(c) {
    let candiData = this.candiData
    const candsL = Object.keys(candiData).length
    let cand = candiData[c]
    // console.log('c', cand)
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
    let nodeEl = this.$(c)
    nodeEl.style.order = parseInt(normScore)
    
    // show value of each candidate
    const nodeSpan = this.$('nodeSpan'+c)
    // nodeSpan.style.width = (myNorm*100) + '%'
    nodeSpan.innerHTML = score
  },

  showDimValues(d) {
    // show dim stats for each node
    const candiData = this.candiData
    Object.entries(candiData).forEach(([c, cand]) => {
      // get normalised score for dimension for candidate
      const myNorm = cand.norm[d]
      const node = this.$(c)
      node.style.opacity = 1

      // change span width of each candidate
      const nodeSpan = this.$('nodeSpan'+c)
      nodeSpan.style.width = (myNorm*100) + '%'
      
      nodeSpan.innerHTML = cand.scores[d]
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
  },

  doNode(candID) {
    //todo unhighlight previously clicked node

    // show dominances - functionate?
    const cand = this.candiData[candID]
    // console.log(cand)
    
    const inferiors = cand.pareto.inferiors
    const superiors = cand.pareto.superiors
    // console.log('infs', inferiors)

    // got through all candidates
    Object.keys(this.candiData).forEach(c => {
      c = Number(c)
      const node = this.$(c)
      // console.log(c)
      if (inferiors.includes(c)) {
        // console.log('inf includes', c)
        // its inf
        node.style.background = 'red'
        // node.style.color = 'white'
        node.style.opacity = '1'
      } 
      else      
      if (superiors.includes(c)) {
        // it's inf
        node.style.background = 'green'
        node.style.opacity = '1'
                
      } else
      if (candID == c) {
        // it's this
        node.style.background = 'white'
        node.style.opacity = '1'

      } else {
        // it's other
        node.style.opacity = '0.3'
      }
    })

    // send message
    EventBus.$emit('nodeClicked', cand)
  },

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
  display flex  // expands sideways

.front
  display flex // run sideways
  flex-wrap wrap
  justify-content space-evenly
  margin-bottom 3rem

.node
  width 140px
  height 2.5rem
  padding 0.05rem
  font-size 0.9rem
  text-align center
  border-radius 0.5rem
  margin 0 0.25rem 0.25rem 0

.value
  color #aa0
  background green

</style>
