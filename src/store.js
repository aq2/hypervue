import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  
  // actual contents of the store 
  state: {
    catData: {},
    cands: [],
  },

  // components get stored data through these 
  getters: {
    getCands: state => {
      return state.cands
    },
    getCatData: state => {
      return state.catData
    }
  },

  // actions call these mutators
  // don't call directly!
  mutations: {
    mutateCands: (state, payload) => {
      state.cands = payload
    },
    mutateCatData: (state, payload) => {
      state.catData = payload
    }
  },

  // actions (that call mutations) dispatched by component events
  // eg. this.$store.dispatch(actionName, payload)
  actions: {
    setCands: (context, payload) => {
      context.commit('mutateCands', payload)
    },
    setCatData: (context, payload) => {
      context.commit('mutateCatData', payload)
    }
  }
})