<template lang="pug">

#rankables
  .rankable rankable? {{rankables}}
  .list(v-for='(dim, index) in dims') 
    label 
    input(type='checkbox' :value='index' v-model='rankables' v-if='!isAlpha(index)')
    .boxy(v-else)
//

</template>

// qq make it possible to rank alphas



// qq avoid mutating props directly it sez
// send an event instead?
// making it simple it complicated!
// yeah event, but how...
// when checkbox toggled, event sent + local state updated
// parent listens and does what's needed

// going to use maps now, i think!
// when to make maps??
// could do it right back then at getfileData
// or do it here on created
// or in rankables sub comp?

// this needs:
  //  for each rankable, calc total, min, max, mean  
  //  for each candidate, for each rankable,
    // find normalised score and ranking

  // OR??

  //  for each rankable,
    // calc total, min, max, mean, sd?
    // for each candidate
      // find ranking and add norm score ann ranking

  // done all this before!
  // could copypasta or use nifty HOFs!

  


<script>
export default {
  props: {
    rankables: {
      type: Array,
      required: true
    },
    dims: {
      type: Array
    }, 
    alphas: {
      type: Array
    }
  },
  
  computed: {
    
  },

  methods: {
    isAlpha: function (i) {
      return this.alphas.includes(i)
    }

    // need normalize/ranking methods here

  },


  created() {
      // alert('yep', this.rankables)
      console.log(this.rankables)
      console.log(this.dims)
      
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
