import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// what are we gonna have in our 'global' central store?
// cats, cands, alphas for a start!
export const store = new Vuex.Store({
  state: {
    foo: 'bar',
    categories: [],
    candidates: [],
    alphas: []
  }
})