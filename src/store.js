import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    myCnter: 0
  },
  getters: {
    getCnter: state => {
      var count = state.myCnter
      return count
    }
  },
  mutations: {
    incCntMut: (state, payload) => {
      state.myCnter += payload
    },
  },
  actions: {
    incCntAct: (context, payload) => {
      setTimeout(function() {
        context.commit('incCntMut', payload)
      }, 2000)
    }
  }
})