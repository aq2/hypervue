<template lang="pug">

#rankables
  .rankable rankable?
  .list(v-for='(dimName, i) in dimNames') 
    label 
    input(type='checkbox' :value='i' @click='changeCrits(i)' v-model='crits' v-if='!isAlpha(i)')
    //- input(type='checkbox' :value='i' @click='changeCrits(i)' v-model='crits' v-if='!alphas.includes(i)')

</template>


<script>
import {EventBus} from '../../../main'

export default {
  data() {
    return {
      crits: []
    }
  },

  props: {
    dimNames: { type: Array }, 
    alphas: { type: Array }
  },
  
  methods: {
    isAlpha: function(i) {
      return this.alphas.includes(i)
    },
    changeCrits: function (i) {
      EventBus.$emit('updateCrits', i)
    }
  },

  created() {
    this.dimNames.forEach((dim, i) => {
      if (!this.isAlpha(i)) {this.crits.push(i)}
    })
   } 
}

</script>



<style lang="stylus" scoped>

.cell
  min-width 140px  // should be calculated somehow or flexboxed!
  // display inline-block
  padding  .5em 0
  margin 0
  min-height 40px


.list
  // @extend .cell
  min-width 140px  // should be calculated somehow or flexboxed!
  // display inline-block
  // padding  .5em 0
  margin 0
  background $blue
  min-height 40px


.rankable
  @extend .cell
  background #456
  text-align center



</style>
