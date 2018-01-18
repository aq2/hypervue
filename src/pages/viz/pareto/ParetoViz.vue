<template lang="pug">

#pViz
  #vizz
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
    // set height of #viz or pViz?
    let vizz = this.$('vizz')

    let mainH = this.$('main').offsetHeight
    let headerH = this.$('header').offsetHeight
    let articleH = mainH - headerH

    // pViz.style.height = articleH + 'px'
    vizz.style.height = articleH + 'px'

    this.orderAllNodes()
    this.colourAllNodes()
  },

  $(ID) {
    return document.getElementById(ID)
  },
    
  orderAllNodes() {
    this.candiData.forEach(cand => {
      this.orderANode(cand.candKey)
    })
  },

  colourAllNodes() {
    this.candiData.forEach(cand => {
      this.colourANode(cand.candKey)
    })
  },
  
  candName(c) {
    return this.candiData[c].candID
  },

  colourANode(c) {
    let candiData = this.candiData
    const candsL = candiData.length

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
    const candsL = candiData.length
    let cand = candiData[c]
    // console.log('c', cand)
    let score, normScore

    if (this.orderMethod == 'rank') {
      score = cand.meanRank
      // aveRanking spreads from 0 to 113 ??
      normScore = (score * 100 / candsL)
    } else 
    if (this.orderMethod == 'score') {
      score = cand.meanNorm * 100
      // norm ranking spreads from 0 to 100?
      normScore = score
    }
    let nodeEl = this.$(c)
    nodeEl.style.order = parseInt(normScore) //qq
    // need some sort of ranking

    nodeEl.style.opacity = 1
    
    // show value of each candidate
    const nodeSpan = this.$('nodeSpan'+c)
    nodeSpan.style.width = (score * 1) + '%'
    nodeSpan.innerHTML = this.orderMethod + ' ' + score.toFixed(1)
  },

  showDimValues(d) {
    // show dim stats for each node
    const candiData = this.candiData
    candiData.forEach((cand) => {
      // get normalised score for dimension for candidate
      const myNorm = cand.norm[d]
      const node = this.$(cand.candKey)
      node.style.opacity = 1

      // change span width of each candidate
      const nodeSpan = this.$('nodeSpan'+cand.candKey)
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
    
    const inferiors = cand.infs
    const superiors = cand.sups
    // console.log('infs', inferiors)

    // got through all candidates
    this.candiData.forEach((cand,c) => {
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
                
      } 
      else
      if (candID == c) {
        // it's this
        node.style.background = 'white'
        node.style.opacity = '1'

      } 
      else {
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
  // margin-top 1rem
  // flex-direction column
  // min-height 90vh
  // min-height 100%
  // justify-content space-evenly
  

#vizz
  display flex  // makes fronts fill screen
  flex-direction column
  flex-grow 1
  background blue
  justify-content space-between
  // margin-top 1rem

.front
  display flex // run sideways
  flex-wrap wrap
  justify-content space-evenly
  // margin-bottom 2.5rem
  border-bottom 2px solid $g2
  // flex-grow 1
  min-height 1rem
  background $g8
  

.node
  width 140px
  height 3rem
  padding 0.05rem
  font-size 1rem
  text-align center
  border-radius 0.5rem
  margin 0 0.75rem 0.4rem 0
  border 2px solid $g3

.value
  color #aa0
  background green

// #article
  // padding 0
  // margin 0

</style>
