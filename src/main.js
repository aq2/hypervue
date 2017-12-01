// import vues
import Vue from 'vue'
import App from './App.vue'
import Header from './Header.vue'
import Flex from './Flex.vue'
import Sidebar from './Sidebar.vue'


import {store} from './store/store'

// my helper functions
// var aq = require('./helpers')

// setup vue components
Vue.component('aq-header', Header)
Vue.component('aq-flex', Flex)
Vue.component('aq-sidebar', Sidebar)


// start the app
new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
})
