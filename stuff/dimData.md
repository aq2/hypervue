# dimData

members:
  fixed:
    key,
    ID,
    scores,
    alpha,
    isID?

boolean:
  crit

getters:

setters:
  getNormalisedScores -> depends on eligibles
  doRankings          -> ditto
  doStats             -> ditto


