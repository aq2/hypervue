// import vues
import Vue from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Contents from './components/Contents.vue'

// vuex datastore
import {store} from './store'

// http stuff
import VueResource from 'vue-resource'
Vue.use(VueResource)

// firebase
import VueFire from 'vuefire'
Vue.use(VueFire)

// awesome icons
import 'vue-awesome/icons/bar-chart'
import 'vue-awesome/icons/upload'
import 'vue-awesome/icons/chevron-circle-right'
import 'vue-awesome/icons/chevron-circle-left'
// import 'vue-awesome/icons'  // !! warns bundles all icons = 500kB
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)



// setup vue components
Vue.component('app-header', Header)
Vue.component('app-sidebar', Sidebar)
Vue.component('app-contents', Contents)

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


// start the app
new Vue({
  el: '#app',
  store,  // ES6 sugar for store: store,
  render: h => h(App)
})
