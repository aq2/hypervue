<template lang="pug">

#page  
  #sidebar
    TheSidebar

  #viz
    // container for each front
    .front(v-for='(front,f) in fronts') 
      .node(v-for='node in front' :ID='node') {{candName(node)}}
        div(:ID="'nodeSpan'+node") span

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
  }
  
},

methods: {

  main() {
    // console.log(this.fronts)
    EventBus.$emit('changeTitle', 'Pareto Dominance Plot')

    // open up sidebar
    // EventBus.$emit('sidebarOpen')
    

    // colour da nodes
    Object.entries(this.candiData).forEach(([key, value]) => {
      // console.log(key)
      this.colourNodes(key)
      this.orderNodes(key)
    })

  },
  candName(c) {
    return this.candiData[c].candID
  },
  colourNodes(c) {
    let candiData = this.candiData
    let candsL = this.candMeta.candidates.length
    let cand = candiData[c]
    let node = cand.candID
    let aveRanking = cand.meanRank
    let aveNorm = cand.meanNorm
    // aveRanking spreads from 0 to 113
    let normedRanking = aveRanking*100/candsL
    let normedNorm = aveNorm*100*100/candsL
    
    // console.log('nR', normedRanking)
    // norm ranking spreads from 0 to 100?
    let nodeEl = document.getElementById(c)
    // nodeEl.style.background = 'hsla(120, 100%, 50%, 0.7'
    nodeEl.style.background = 'hsla(230, 60%, ' + (100-normedNorm) + '%, 0.9'
    if (normedNorm > 50) {
      nodeEl.style.color = 'grey'
      
    }
    // nodeEl.style.background = 'hsla(120, 100%, ' + (100-normedRanking) + '%, 0.9'
  },
  orderNodes(c) {
    let candiData = this.candiData
    let cand = candiData[c]
    // let node = cand.candID
    let aveRanking = cand.meanRank
    let aveNorm = cand.meanNorm
    // aveRanking spreads from 0 to 113
    // let normedNorm = aveNorm*100*100/candsL
    // console.log('c', c, aveRanking)
    // norm ranking spreads from 0 to 100?
    let nodeEl = document.getElementById(c)
    // nodeEl.style.background = 'hsla(120, 100%, 50%, 0.7'
    nodeEl.style.order = parseInt(aveRanking)
  }

},

mounted() {
  this.main()
}

}

</script>


<style lang="stylus" scoped>

#page 
  display flex  // sideways
  // height 100%
  // flex-grow 1



//


#viz 
  margin-top .5rem
  // overflow hidden
  

.front
  margin-bottom 2.5rem
  display flex
  flex-wrap wrap
  justify-content space-evenly

.node
  flex-grow 1
  width 140px
  max-width 140px
  height 2.5rem
  background green
  border 2px solid $g3
  border-radius 0.5rem
  margin-bottom 0.2rem
  text-align center
  padding 0.05rem
  font-size 0.9rem
  // margin-right 0.2rem

</style>
