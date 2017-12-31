export const Dimension = function(spec) {
  // safety feature if don't use 'new' -> undefined
  if (!(this instanceof Dimension)) {
    return new Dimension()
  }
  
  // private to constructor
  var dimKey = spec.dimKey
  var dimName = spec.dimName      
  var dimScores = []
  var dimStats = []
  var dimRankings = []
  // var calcStats
  // var calcRankings
  // var dimData = spec.dimData
  var alpha
  var crit

  // also need getters
  this.getDimkey = () => dimKey
  this.getDimName = () => dimName
  this.getDimScores = () => dimScores
  this.getDimStats = () => dimStats
  this.getDimRankings = () => dimRankings
  
  // and setters
  this.setScores = () => {}


  
}