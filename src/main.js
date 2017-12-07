// import vues
import Vue from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Contents from './components/Contents.vue'

// vuex datastore
import {store} from './store'


// setup vue components
Vue.component('q-header', Header)
Vue.component('q-sidebar', Sidebar)
Vue.component('q-contents', Contents)

// setup event bus that components can register with
export const bus = new Vue()

// my global helper functions
// my ajQuery selector
window.$ = (selector) => {
  var selectorType = 'querySelectorAll'
  if (selector.indexOf('#') === 0) {
      selectorType = 'getElementById'
      selector = selector.substr(1, selector.length)
  }
  return document[selectorType](selector)
}

window.foobar = () => {
  alert('foobar')
}


// start the app
new Vue({
  el: '#app',
  store,  // ES6 sugar for store: store,
  render: h => h(App)
})
