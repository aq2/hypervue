<template lang="pug">

#dims
  h3 dimensions
  .dim(v-for='(dim,d) in dimNames' :ID="'dim'+d" v-if='dimCrit(d)'
    @click='showDim(d)') {{dim}}

    .stats(:ID="'span'+d")
      p range: {{stats(d).min}} - {{stats(d).max}}
      p mean:{{(stats(d).mean)}} sd:{{stats(d).stdDev}}
    hr
  #order
    h3 order by
    hr
  #colour
    h3 colour by
    hr
  #search
    h3 search
    | insert search here

</template>


<script>

import {EventBus} from '../../../main'

export default {
  computed: {
    candiData() {
      return this.$store.getters.getCandiData
    },
    dimMeta() {
      return this.$store.getters.getDimMeta
    },
    dimData() {
      return this.$store.getters.getDimData
    },
    dimNames() {
      return this.dimMeta.dimNames
    },
    crits() {
      return this.dimMeta.crits
    }
  },

  methods: {
    showDim(d) {
      // reset color for t'others
      const allDims = [...document.getElementsByClassName('dim')]
      allDims.forEach(d => {
        d.style.color = '#111'
      })

      // set color for clicked dim
      const dim = document.getElementById('dim' + d)
      dim.style.color = '#89a'

      // change span widths in viz
      EventBus.$emit('showDimValues', d)
    },

    dimCrit(d) {
      return (this.crits.includes(d))
    },

    stats(d) {
      const stats = this.dimData[d].stats
      let roundStats = {}
      Object.entries(stats).forEach(([k,v]) => {
        roundStats[k] = Math.round(v)
      })
      return roundStats
    },

  }
}
</script>


<style lang="stylus" scoped>

.dim
  margin-bottom 0.5rem
  color $g9

.stats p
  color $g7

p 
  padding 0
  margin 0

h3  
  padding-top 0.25rem
  margin-bottom 0.25rem

hr 
  border 0
  border-top 2px dotted $g5
  width 100px
  margin 10px auto


</style>
