// import vues
import Vue from 'vue'
import App from './App.vue'
import Header from './Header.vue'
import Flex from './Flex.vue'
import {store} from './store/store'

// my helper functions
// var aq = require('./helpers')

// setup vue components
Vue.component('app-header', Header)
Vue.component('app-flex', Flex)


// start the app
new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
})
