var exampleCand = {
        key: 0,
        ID: 'Cambridge',
        scores: [
          {
            catNum: 0,                // repeated data, but useful?
            catName: 'rank',          // repeated data, but useful?
            origScore: 1,
            normalisedScore: false,   // not rankable     * laters?
            rank: false,              // not rankable,    *
            maxi: false               // could be useful  *
          },
          {
            catNum: 1,
            catName: 'name',
            origScore: 'Cambridge',
            normalisedScore: false,
            rank: false
          },
          {
            catNum: 2,
            catName: 'nss',
            origScore: 4732,
            normalisedScore: 0.2,
            rank: 1
          },
          {
            catNum: 3,
            catName: 'hons',
            origScore: 72.1,
            normalisedScore: 0.2,
            rank: 2
          }
        ]
        // later add pareto object {}
      }


var values = [
  {index:0, value:3},
  {index:1, value:7},
  {index:2, value:2},
  {index:3, value:7}
]

values.sort(function(a,b) {return a.value - b.value})


function findRankOfCand(x) {
var rankOfIndex = values.find(v => v.index == x)
return values.indexOf(rankOfIndex)
}

var r = findRankOfCand(0)
console.log(r)


 firePost: function() {
      this.$http.post('https://dvzvue.firebaseio.com/mystuff.json', {
        msg: 'success!',
        author: 'mickey'
      }).then(function(data){
        console.log(data)
        this.submitted = true
      })
    }

    created() {
      // get data from dbase
      this.$http.get('https://dvzvue.firebaseio.com/mystuff.json')
        .then(function(data) {
          // console
          return data.json()
        })
        .then(function(data) {
          console.log(data)
          var blogsArray = []
          for (let key in data) {
            console.log(key, data[key])
            data[key].id = key
            blogsArray.push(data[key])
          }
          console.log(blogsArray)
          this.blogs = blogsArray
          
        })
    }

// global classes


// // global mixins
// border-radius(radius=5px)
//   border-radius radius
//   border 1px solid transparent
//   transition .5s all ease
//   :hover
//     background: $lightblue
//     cursor: pointer
//     color #ccc
//     border 1px solid darkblue
//     border 2px solid $green
//     animation throb linear 2s infinite

// /* Flash class and keyframe animation */
// .flashit
//   color $green
//   animation flash linear 2s infinite
//   font-size 24px
//   // border 1px solid $green

// .throbber
//   border 2px solid $green
//   animation throb linear 2s infinite
    

// @keyframes flash
//   0% { opacity: 1; } 
//   50% { opacity: .2 } 
//   100% { opacity: 1; }

// @keyframes throb
//   0% { border-color: $green } 
//   50% { border-color: $blue } 
//   100% { border-color: $green }
