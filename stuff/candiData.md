# candiData

this.data:
  fixed:
    key,
    ID,
    scores
  
  boolean:
    eligible  -> repercusions!
  
getters:
  getScores -> consults this.scores
  getScoresByDim -> ditto

  getNormalised -> from dim?
  getRankings -> get from dim

setters:
  set eligible -> affects norm, stats, ranking