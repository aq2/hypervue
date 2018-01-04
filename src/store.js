import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  // actual contents of the store 
  state: {
    dimData: {},
    candiData: [],
  },

  // components get stored data through these 
  getters: {
    getDimData: state => {
      return state.dimData
    },
    getCandiData: state => {
      return state.candiData
    }
  },

  // actions call these mutators
  // don't call directly!
  mutations: {
    mutateCandiData: (state, payload) => {
      state.candiData = payload
    },
    mutateDimData: (state, payload) => {
      state.dimData = payload
    }
  },

  // actions (that call mutations) dispatched by component events
  // eg. this.$store.dispatch(actionName, payload)
  actions: {
    setCandiData: (context, payload) => {
      context.commit('mutateCandiData', payload)
    },
    setDimData: (context, payload) => {
      context.commit('mutateDimData', payload)
    }
  }
})