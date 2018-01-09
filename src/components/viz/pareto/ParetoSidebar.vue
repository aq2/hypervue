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
    //- radio buttons?
    label mean rank
      input(type='radio' value=1 @click="orderBy('rank')" v-model='oB')
      span(class='checkmark radio')
    label mean score
      input(type='radio' value=2 @click="orderBy('score')" v-model='oB')
      span(class='checkmark radio')
  hr
  #colour
    h3 colour by
    label mean rank
      input(type='radio' value=1 @click="colourBy('rank')" v-model='cB')
      span(class='checkmark radio')
    label mean score
      input(type='radio' value=2 @click="colourBy('score')" v-model='cB')
      span(class='checkmark radio')
    //- radio buttons?
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
  data() {
    return {
      oB: 1,      // sets default radio for orderBy
      cB: 2      // sets default radio for orderBy
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

    orderBy(meth) {
      // emit event to viz
      EventBus.$emit('orderBy', meth)
    },

    colourBy(meth) {
      // emit event to viz
      EventBus.$emit('colourBy', meth)
    }

  }
}

</script>


<style lang="stylus" scoped>

@import '../../../components/data-sources/csv/inputs'

label 
  margin 0
  // display block
  width 120px
  // font-size 0.9rem 

label span
  margin-left 105px
  // position static

.checkmark
  background-color $g4

.dim
  margin-bottom 0.25rem
  color $g9

.stats p
  color $g7

p 
  padding 0
  margin 0

h3  
  // padding-top 0.25rem
  margin 0
  padding 0
  // margin-bottom 0.25rem

hr 
  border 0
  border-top 2px dotted $g5
  width 100px
  margin 0.25rem auto


</style>
