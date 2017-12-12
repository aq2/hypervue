<template>
  <div id="wrapper">
    <div id="sidebar">
      sidebar
      {{ foo }}
      <div id="cats">
        categories
      </div>
      <div id="vizType">
        viz type
      </div>
    </div>
    <div id="main">
      <h1>main</h1>
      <button id='btn1' onclick="document.getElementById('sidebar').style.width = '130px'">transit</button>
    </div>
  </div>
</template>


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