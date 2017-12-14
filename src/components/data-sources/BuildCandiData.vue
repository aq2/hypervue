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
          input(type='checkbox' :value='index' v-model='rankable' v-if='!isAlpha(index)')
          .boxy(v-else)
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
    isAlpha(i) {
      return this.alphas.has(i)
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
        
        // qq JUST DONE MONSTER SESH
        // this.buildRankableScoresForCandidates()
        this.findRankingsForCandidates()

        // normalise all the rankables!
        // buildNormalisedScoresForCandidates // qq

    },
    findRankingsForCandidates() {
      // todo componentize - it will be handy for ron
      // also split into smaller functions - bit of a head fuck
      // should deal with maxis somewhere - or wait for normalize?
      var catData = this.catData
      var rankables = catData.rankables
      var ranksL = rankables.length
      var categories = catData.categories
      var catsL = categories.length
      var allIndexedRankables = []
      var alphas = catData.alphas      
      var alphasL = alphas.size

      for (var a=0; a<alphasL; a++) {
        allIndexedRankables.push({rankable: false})
      }

      // for each rankable category
      for (var r=0; r<ranksL; r++) {
        var indexedRankable = []        
        var scores = categories[rankables[r]].values

        // build new array of [{index:0, value:6}, ... {index:3, value:4}]
        for (var cat = 0; cat<catsL; cat++) {
          indexedRankable.push({index: cat, value: scores[cat]})
        }
        
        // then sort that by value
        indexedRankable.sort(function(a,b) {return a.value - b.value})
        // min = sorted[0], max = sorted[last]        
        categories[rankables[r]].min = indexedRankable[0].value
        categories[rankables[r]].max = indexedRankable[catsL-1].value

        allIndexedRankables.push(indexedRankable)
      } 
      
      // can find rankings of ID via my clever method
      var cands = this.cands
      var candsL = cands.length
      // for each candidate,
      for (var cand=0; cand<candsL; cand++) {
        var candidate = cands[cand]
        // for each rankable category
        for (var ra=0; ra<ranksL; ra++) {
          // find their ranking by index (?)
          var rankingInScores  = this.findRankOfCand(cand, allIndexedRankables[rankables[ra]])
          // add ranking to scores[]
          candidate.scores[rankables[ra]].ranking = rankingInScores
        }
      }
    },
    findRankOfCand0(x, values) {
      var rankOfIndex = values.find(function(v) {
        if (v.index == x) {
          return true 
        }
      })
      return values.indexOf(rankOfIndex)
    },
    findRankOfCand(x, values) {
      var rankOfIndex = values.find(v => v.index == x)
      return values.indexOf(rankOfIndex)
    },
    buildRankableScoresForCandidates00() { // not using?
      var cands = this.fileData.cands
      var candsL = cands.length
      var rankables = this.rankable
      
      var catData = this.catData
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
      alphas: new Set(),
      cands: []
    }
  },
  created() {
    this.catData = this.fileData.catData
    this.rankable = this.catData.rankables 
    this.alphas = this.catData.alphas
    this.cats = this.catData.cats
    this.cands = this.fileData.cands
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

