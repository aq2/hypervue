import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  
  // actual contents of the store 
  state: {
    cats: [],
    fileData: {}
  },

  // components get stored data through these 
  getters: {
    getCats: state => {
      return state.cats
    },
    getFileData: state => {
      return state.fileData
    }
  },

  // actions call these mutators
  // don't call directly!
  mutations: {
    mutateCats: (state, payload) => {
      state.cats = payload
    },
    mutateFileData: (state, payload) => {
      state.fileData = payload
    }
  },

  // actions (that call mutations) dispatched by component events
  // eg. this.$store.dispatch(actionName, payload)
  actions: {
    setCats: (context, payload) => {
      context.commit('mutateCats', payload)
    },
    setFileData: (context, payload) => {
      context.commit('mutateFileData', payload)
    }
  }
})