import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  
  // actual contents of the store 
  state: {
    // cats: [],
    // fileData: {},
    alphas: [],
    cands: [],
    dimNames: []
  },

  // components get stored data through these 
  getters: {
    getAlphas: state => {
      return state.alphas
    },
    getCands: state => {
      return state.cands
    },
    getDimNames: state => {
      return state.dimNames
    },
    // getFileData: state => {
      // return state.fileData
    // }
  },

  // actions call these mutators
  // don't call directly!
  mutations: {
    mutateAlphas: (state, payload) => {
      state.alphas = payload
    },
    mutateCands: (state, payload) => {
      state.cands = payload
    },
    mutateDimNames: (state, payload) => {
      state.dimNames = payload
    },
    // mutateFileData: (state, payload) => {
      // state.fileData = payload
    // }
  },

  // actions (that call mutations) dispatched by component events
  // eg. this.$store.dispatch(actionName, payload)
  actions: {
    setAlphas: (context, payload) => {
      context.commit('mutateAlphas', payload)
    },
    setCands: (context, payload) => {
      context.commit('mutateCands', payload)
    },
    setDimNames: (context, payload) => {
      context.commit('mutateDimNames', payload)
    },
    // setFileData: (context, payload) => {
      // context.commit('mutateFileData', payload)
    // }
  }
})