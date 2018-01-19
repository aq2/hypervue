<template lang="pug">

#info
  .data
    .name {{cand.candID}}
    .rank mean Rank {{cand.meanRank}}  / {{candL}}
    .score mean Norm Score {{meanNorm}}
  .databar
    .bar(v-for='(crit, c) in crits')
      .top(:id="'top'+c") {{critInit(c)}}
      .bottom(:id="'bott'+c")

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
  meanNorm() {
    return this.cand.meanNorm.toFixed(3)
  }
  
},
data() {
  return {
    critInit(c) {
      return this.dimMeta.dimNames[this.crits[c]][0]
    },
    cand: {candID: 'click on a node', meanRank: -1, meanNorm: -1},
    candL: 0
  }
},

// listen to click on node event to change candKeyloop[]
created() {
  EventBus.$on('showCandInfo', ([cand, length]) => {
    this.cand = cand
    this.candL = length
  })
}


}
</script>


<style lang="stylus" scoped>

#info
  background blue
  width 600px
  height 80px
  margin 0
  display flex

.data 
  background purple 
  width 300px

.name
  font-size 1.25rem
  color $g9


.databar  
  display flex
  height 60px
  // padding 0

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
  


</style>
