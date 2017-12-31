<template lang="pug">

#rankables
  .maxi maxi?
  .list(v-for='(dimName, index) in dimNames') 
    label 
    input(type='checkbox' :value='index' @click='changeMaxis(index)' v-model='maxis' v-if='isRankable(index)')

</template>


<script>
import {EventBus} from '../../../main'

export default {
  data() {
    return {
      maxis: []
    }
  },

  props: {
    dimNames: { type: Array }, 
    crits: {type: Array}
  },

  methods: {
    changeMaxis: function (i) {
      EventBus.$emit('updateMaxis', i)
    },
    isRankable(i) {
      return this.crits.includes(i)
    },
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


.maxi
  @extend .cell
  background #456
  text-align center



</style>
