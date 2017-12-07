import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    myCounter: 0
  },
  getters: {
    getCounter: state => {
      var count = state.myCounter
      return count
    }
  },
  mutations: {
    incCountMut: state => {
      state.myCounter++
    }
  }
})