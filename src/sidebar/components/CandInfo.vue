<template lang="pug">

#candInfo
  #info(v-show='candL > 0')
    .data
      .name {{cand1.candID}}
      .rank mean Rank {{cand1.meanRank}}  / {{candL}}
      .score mean Norm Score {{meanNorm(1)}}
    .databar
      .bar(v-for='(crit, c) in crits')
        .top(:id="'top'+c") {{critInit(c)}}
        .bottom(:id="'bott'+c")
    .databar2
      .bar(v-for='(crit, c) in crits')
        .top(:id="'top'+c") {{critInit(c)}}
        .bottom(:id="'bott'+c")
    .data2
      .name {{cand2.candID}}
      .rank mean Rank {{cand2.meanRank}}  / {{candL}}
      .score mean Norm Score {{meanNorm(2)}}
  
  #instr(v-show='candL < 1')
    p Hover over a node for info
    p Click on a node for dominance

</template>


<script>

import {EventBus} from './../../main'

export default {

computed: {
  dimMeta() {
    return this.$store.getters.getDimMeta
  },
  crits() {
    return this.dimMeta.crits
  },
  
  
},
methods: {
  meanNorm(cand) {
    let thisCand = this.cand1
    if (cand == 2) {
      thisCand = this.cand2
    }
    return thisCand.meanNorm.toFixed(3)
  }
},


data() {
  return {
    critInit(c) {
      return this.dimMeta.dimNames[this.crits[c]][0]
    },
    candL: 0,
    cand2: {meanNorm:-1},
    cand1: {candID: 'click on a node', meanRank: -1, meanNorm: -1}
  }
},

// listen to click on node event to change candKeyloop[]
created() {
  EventBus.$on('showCandInfo', ([cand, length]) => {
    this.cand2 = cand
    this.candL = length
  })

  EventBus.$on('nodeSelected', ([cand, length]) => {
    this.cand1 = cand
    // this.candL = length
  })
}


}
</script>


<style lang="stylus" scoped>

#info
  width 800px
  height 80px
  display flex
  margin 0 0 0 1rem

.data, .data2
  max-width 230px
  min-width 230px

.name
  color $g9
  font-size 1.25rem

.databar, .databar2
  height 80px
  display flex

.databar2, .data2
  padding-left 0.5rem

.bar
  width 20px
  background red

.top
  background green
  height 20px
  text-align center

#top5
  height 50px

#top3
  height 40px
  
#instr p
  margin 0
  color $g9
  font-size 1.52rem
  padding 0.5rem 0 0 1rem
  animation flash linear 2s infinite

</style>
