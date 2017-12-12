<template lang='pug'> 
  #gotFile
    h2 category meta data
    #cont
      #top
        .catName category
        .example example
        .rankable rankable
        .maxi(v-if='step > 0') maxi
        .id(v-if='step > 1') ID
      .list(v-for='(cat, index) in cats') 
        .catName {{cat}}
        .example {{exampleData.scores[index].origScore}}
        .rankable
          label 
          input(type='checkbox' :value='index' v-model='rankable')
        .maxi(v-if='step > 0 && isRankable(index)')
          label 
          input(type='checkbox' :value='index' v-model='maxi')
        .maxi(v-if='step > 0 && !isRankable(index)')
          .boxy
        .id(v-if='step > 1')
          label 
          input(type='radio' :value='index' v-model='ID')

    div(v-if='step == 0')
      p first, select orderable categories to include in rankings
      p ie don't select a non-numeric category
      p need at least two categories
      p press OK when done
      button(@click='checkRankables') OK
    
    div(v-if='step == 1')
      p now select categories where high values are good
      p default is lower values are better
      .list DO WE EVEN NEED THIS?
      p press OK when done
      button(@click='checkMaxis') OK
    
    div(v-if='step == 2')
      p now select a category to use as an identifier
      p this name will be used to identify candidates
      p so chose an alpha-numeric name
      p press OK when done
      button(@click='checkID') OK

    p rankable {{rankable}}
    p maxi {{maxi}}
    p ID {{ID}}

</template>



<script>
  // todo - file getting too big -> subcomponentize?
export default {
  // get stuff from store!
  computed: {
    fileData() {
      return this.$store.getters.getFileData
    },
    exampleData() {
      return this.fileData.cands[0]
    }
  },
  methods: {
    checkRankables() {
      // must be at least two rankables
      if (this.rankable.length > 1) {
        this.step = 1
      } else {
        alert('not enough rankables - need at least two!')
      }
    },   
    isRankable(i) {
      return this.rankable.includes(i)
    },
    checkMaxis() {
        // this.catData.maxis = this.maxi
        this.step = 2
        var rankables = this.rankable
        var maxis = this.maxi
        // first need to make sure maxi is in rankable
        for (var max of maxis) {
          if (!rankables.includes(max)) {
            alert('maxi not in rank')
            // todo deal with it!
          }
        }
        this.buildRankableScoresForCandidates()

        // normalise all the rankables!
        // buildNormalisedScoresForCandidates // qq

    },
    buildRankableScoresForCandidates() {
      var cands = this.fileData.cands
      var candsL = cands.length
      var rankables = this.rankable
      
      var catData = this.catData    // do i need these?
      var cats = catData.cats
      var catsL = cats.length

      var mins = []
      var maxs = []
      for (var ca = 0; ca < catsL; ca++) {
        mins[ca] = this.fileData.cands[0].scores[ca].origScore
        maxs[ca] = mins[ca]
      }

      // for each cand,
      for (var c=0; c<candsL; c++) {
        var cand = cands[c]
        // for each score/category
        for (var s=0; s<catsL; s++ ) {
          var orig = cand.scores[s].origScore
          if (orig < mins[s]) {
            mins[s] = orig
          } //else?
          if (orig > maxs[s]) {
            maxs[s] = orig
          }
          // add rankable score = same as origScore or false
          cand.scores[s].rankableScore = false
          if (rankables.includes(s)) {
            cand.scores[s].rankableScore = orig
          }
        }
      }
      console.log('cands', cands)
      console.log('mins', mins)
      console.log('maxs', maxs)
      // ok where to store them?
      // in catData - need new cat datastructure! // qq


      //now normalise() - or call it in checkMaxis above

    },
    normaliseAll() {
      // then normalise each rankable for each candidate

    },
    checkID() {
      this.catData.ID = this.ID
      this.step = 3
      console.log('catData', this.catData)
      // assign ID to all cands
      // step 3?
        // save data to store
       // todo offer to save it to firebase
    }
  },
  data() {
    return {
      steps: ['rankable', 'maxi', 'ID'],
      step: '0',
      rankable: [],
      maxi: [],
      ID: [],
      catData: {},
      alphas: new Set()
    }
  },
  created() {
    this.catData = this.fileData.catData
    this.rankable = this.catData.rankables 
    this.alphas = this.catData.alphas
    this.cats = this.catData.cats
  }
}
</script>


<style lang="stylus" scoped>

#cont 
  background #eee

.list 
  background $blue

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

