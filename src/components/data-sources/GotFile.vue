<template lang='pug'>
  #gotFile
    h2 category meta data
    #cont
      #top
        .catName category
        .example example
        .rankable rankable
        .maxi(v-if="step > 0") maxi
        .id(v-if="step > 1") ID

      .list(v-for='(cat, index) in cats') 
        .catName {{cat}}
        .example {{exampleData.scores[index]}}
        // todo auto-select all non-alphas
        .rankable(v-if="step >= 0")
          label 
          input(type='checkbox' :value='index' v-model='rankable')
        // todo only show for rankables
        .maxi(v-if="step >= 1")
          label 
          input(type='checkbox' :value='index' v-model='maxi')
        // shouldn't be an array, but a single integer value
        .id(v-if="step >= 2")
          label 
          input(type='checkbox' :value='index' v-model='ID')

    div(v-if="step==0") first, select orderable categories to include in rankings
      p ie don't select a non-numeric category
      p need at least two categories
      p press OK when done
      button(@click='checkRankables') OK
    
    div(v-if="step == 1") now select categories where high values are good
      p default is lower values are better
      p press OK when done
      button(@click='checkMaxis') OK
    
    div(v-if="step == 2") now select a category to use as an identifier
      p this name will be used to identify candidates
      p so chose an alpha-numeric name
      p press OK when done
      button(@click='checkID') OK

    //- p rankable {{rankable}}
    //- p maxi {{maxi}}
    //- p ID {{ID}}

</template>



<script>
export default {
  // get stuff from store!
  computed: {
    fileData() {
      return this.$store.getters.getFileData
    },
    cats() {
      return this.fileData.cats
    },
    cands() {
      return this.fileData.cands
    },
    alfs() {
      return this.fileData.alfs
    },
    exampleData() {
      return this.fileData.cands[0]
    }
  },
  methods: {
    checkRankables() {
      // must be at least two rankables
      if (this.rankable.length > 1) {
        this.catData.cats = this.cats
        this.catData.rankables = this.rankable
        this.step = 1
        // assign rankables to all cands!
      } else {
        alert('not enough rankables - need at least two!')
      }
    },
    checkMaxis() {
        this.catData.maxis = this.maxi
        this.step = 2
        // assign maxis to all cands
    },
    checkID() {
      this.catData.ID = this.ID
      this.step = 3
      // assign ID to all cands
      // step 3?
        // save data to store
       // qq offer to save it to firebase
    }
  },
  data() {
    return {
      steps: ['rankable', 'maxi', 'ID'],
      step: '0',
      rankable: [],
      maxi: [],
      ID: [],
      catData: {}
    }
  }
}
</script>


<style lang="stylus" scoped>

#cont 
  background #eee

.list 
  background #b00

.cell
  min-width 140px  // should be calculated somehow or flexboxed!
  display inline-block
  padding  .5em 0
  margin 0

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
 
.box1
  background black

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

.instructions
  @extend .cell
  margin-left 1em

.instructions2
  @extend .cell
  margin-left 1em

label
  // display none



</style>

