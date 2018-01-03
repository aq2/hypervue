<template lang="pug">

fieldset(id='crits')
  legend criterion
  .list(v-for='(dimName, i) in dimNames'
    @mouseover='hi(i)' 
    @mouseleave='unhi(i)'
  ) 
    label(v-if='!isAlpha(i)')
      input(type='checkbox' :value='i' @click='changeCrits(i)' v-model='crits')
      span(class='checkmark')
    
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
    },
    hi: function(i) {
      var el = document.getElementById(i)
      el.style.color = 'white'
    },
    unhi: function(i) {
      var el = document.getElementById(i)
      el.style.color = 'black'
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

@import 'inputs'

</style>
