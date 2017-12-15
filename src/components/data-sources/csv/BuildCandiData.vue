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

    //-
      // step 4?
        // save data to store
       // todo offer to save it to firebase
    

</template>



<script>
  // todo - file getting too big -> subcomponentize?
  import {eventBus} from '../../../main'

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
        this.buildNormalisedScoresForCategories()
        this.buildNormalisedScoresForCandidates() 
        // qq

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
      this.ID = alphas.keys().next().value
      // console.log({myID})
      

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
    findRankOfCand(x, values) {
      var rankOfIndex = values.find(v => v.index == x)
      return values.indexOf(rankOfIndex)
    },
    buildNormalisedScoresForCategories() {
      var categories = this.catData.categories
      var catsL = categories.length
      var normed

      // for all categories
      for (var c=0; c<catsL; c++) {
        var cat = categories[c]
        // if rankable
        if (cat.rankable) {
          // get values
          var values = cat.values
          // normalise them
          normed = this.normalise(values, cat.min, cat.max)
        } else {
          // else false?
          normed = false
        }
        // add them to category object
        cat.normalised = normed
      }
    },
    normalise(a, min, max) {
      var l = a.length
      var normalised = []
      for (var i=0; i<l; i++) {
        var norm = (a[i] - min) / (max - min)
        normalised.push(norm)
      }
      return normalised
    },
    buildNormalisedScoresForCandidates() {
      var cands = this.cands
      var candsL = cands.length
      var cats = this.catData.categories
      var catsL = cats.length
      
      // for all candidates
      for (var c=0; c<candsL; c++) {
        var cand = cands[c]
      
        // for all rankable cats
        for (var i=0; i<catsL; i++) {
          var cat = cats[i]
          if (cat.rankable) {
            // get normalised score
            var norm = cat.normalised[c]
            // add it to candidate score
            cand.scores[i].normalisedScore = norm
          } else {
            cand.scores[i].normalisedScore = false   
          }
        }

      }
    },
    checkID() {
      // alert('checkID')
      
      var ID = this.ID
      this.catData.ID = ID
      this.step = 3
      if (ID != null) {
        var IDname = this.catData.cats[ID]
        // var candID = 
        // console.log({IDname})
        
        // makeIDforCands
        this.makeIDforCands(ID)
        // catDataID? - already set somehow ??
        
        // makeIDforCats qq
        this.makeIDforCats(ID)
        
        // eventBus.$emit('dataBuilt')

      } else {
        // todo
        return false
      }
      
    },
    makeIDforCats(ID) {
      var categories = this.catData.categories
      var catsL = categories.length 
      // for each category
      for (var c=0; c<catsL; c++) {
        // set cat.ID to true or false
        var cat = categories[c]
          if (c == ID) {
            cat.ID  = true
          } else {
            cat.ID  = false            
          }
      }
    },
    makeIDforCands(ID) {
      // alert('boo')
      var cands = this.cands
      var candsL = cands.length
      // for all cands,
      for (var c=0; c<candsL; c++) {
        var cand = cands[c]
        // assign ID
        var candID = cand.scores[ID].origScore
        cand.ID = candID
      // console.log({cand})
      }
      
    }
  },
  data() {
    return {
      steps: ['rankable', 'maxi', 'ID'],
      step: '0',
      rankable: [],
      maxi: [],
      ID: null,
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

