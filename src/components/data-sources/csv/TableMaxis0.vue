<template lang='pug'>

#TablesMaxi
  .maxi maxisB
    .list(v-for='(rankable, index) in cats') 
      label 
      input(type='checkbox' :value='index' 
            v-model='tableMaxis' v-if='isRankable(index)'
            @click='changeMaxis(index)'
            )
      .boxy(v-else)

  p myMaxis {{tableMaxis}}
  //- p cats {{cats}}
</template>



<script>

import {EventBus} from '../../../main'

export default {
  props: ['rankables', 'cats'],
  data() {
    return {
      tableMaxis: [],
      ranks2: [],
      idx: -1
    }
  },
  computed: {
    gimme() {
      return this.maxis
    }
  },
  methods: {
    isRankable(i) {
      // console.log(i, this.rankable.includes(i))
      return this.rankables.includes(i)
    },
    changeMaxis: function(index) {
      // this.maxis.fish = this.maxis2
      // var i = 
      EventBus.$emit('updateMaxis', index)
    }
  }
}
</script>



<style lang="stylus" scoped>

.fade-enter-active, .fade-leave-active
  transition opacity 3s

.fade-enter, .fade-leave-to 
  opacity 0

.cell
  min-width 140px  // should be calculated somehow or flexboxed!
  display inline-block
  padding  .5em 0
  margin 0

.list
  min-width 140px  // should be calculated somehow or flexboxed!
  // display inline-block
  // padding  .5em 0
  margin 0
  background $blue

.boxy
  @extend .cell
  text-align center
  background black

.maxi 
  @extend .cell
  background #789
  text-align center



cell
  min-width 140px  // should be calculated somehow or flexboxed!
  display inline-block
  padding  .5em 0
  margin 0

.list
  min-width 140px  // should be calculated somehow or flexboxed!
  // display inline-block
  // padding  .5em 0
  margin 0
  background $blue

#top
  background orange
  padding 0
  margin 0
  
.catName
  @extend .cell  // qq css inheritance!
  background steelblue
  padding-left 10px
  font-weight bold
  
.boxy
  @extend .cell
  text-align center

.example
  @extend .cell
  padding-left: 1em
  background #ccc
  
.rankable
  @extend .cell
  background #456
  text-align center

.maxi 
  @extend .cell
  background #789
  text-align center

.id
  @extend .cell
  background #9ab
  text-align center


label
  // display none


</style>
