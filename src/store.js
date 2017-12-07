import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    myCnter: 0,
    cats: [],
    fileData: {}
  },
  getters: {
    getCnter: state => {
      var count = state.myCnter
      return count
    },
    getCats: state => {
      return state.cats
    },
    getFileData: state => {
      return state.fileData
    }
  },
  mutations: {
    incCntMut: (state, payload) => {
      state.myCnter += payload
    },

    mutateCats: (state, payload) => {
      state.cats = payload
    },
    mutateFileData: (state, payload) => {
      state.fileData = payload
    }
  },
  actions: {
    incCntAct: (context, payload) => {
      setTimeout(function() {
        context.commit('incCntMut', payload)
      }, 800)
    },
    setCats: (context, payload) => {
      context.commit('mutateCats', payload)
    },
    setFileData: (context, payload) => {
      context.commit('mutateFileData', payload)
    }
  }
})