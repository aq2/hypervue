<template lang="pug">

fieldset(id='max')
  legend maxis
  .list(v-for='(dimName, i) in dimNames'
    @mouseover='hi(i)' 
    @mouseleave='unhi(i)') 
    label(v-if='isRankable(i)')
      input(type='checkbox' :value='i' @click='changeMaxis(i)' v-model='maxis')
      span(class='checkmark')
    //- .boxy(v-else)

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
    hi: function(i) {
      document.getElementById(i).style.color = 'white'
    },
    unhi: function(i) {
      document.getElementById(i).style.color = 'black'
    }
  }

}

</script>



<style lang="stylus" scoped>
@import 'inputs'

// .cell
//   min-width 140px  // should be calculated somehow or flexboxed!
//   // display inline-block
//   padding  .5em 0
//   margin 0
//   min-height 40px


// .list
//   // @extend .cell
//   min-width 140px  // should be calculated somehow or flexboxed!
//   // display inline-block
//   // padding  .5em 0
//   margin 0
//   background $blue
//   min-height 40px


// .maxi
//   @extend .cell
//   background #456
//   text-align center



</style>
