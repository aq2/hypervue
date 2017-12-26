<template lang="pug">

#rankables
  .rankable rankable? {{rankables}}
  .list(v-for='(dim, index) in dims') 
    label 
    input(type='checkbox' :value='index' v-model='rankables' v-if='!isAlpha(index)')
    .boxy(v-else)
//

</template>

// qq avoid mutating props directly it sez
// send an event instead?
// making it simple it complicated!


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
