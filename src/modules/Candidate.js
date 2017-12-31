export const Candidate = function(spec) {
  // safety feature if don't use 'new' -> undefined
  if (!(this instanceof Candidate)) {
    return new Candidate()
  }
  
  // private to constructor - notice no 'this'
  // set during instantiation
  var candID = spec.candID      
  var candKey = spec.candKey
  var scores = spec.scores
  // have their own setters below
  var normScores = []
  var rankings = []
  
  // public methods - 'this'
  this.getCandID = () => candID
  this.getKey = () => candKey
  this.getScores = () => scores
  this.getNormScores = () => normScores
  this.getRankings = () => rankings
  this.getAll = () => {return {
    candID, candKey, scores, normScores, rankings
  }} 
  this.getDimData = () => this.dimData

  // also need to update score in dim
  this.setScores = (s) => {scores = s}


  this.setNormScores = () => {}
  this.setRankings = function() {}

}

Candidate.prototype.dimData = {foo:'wine'}




