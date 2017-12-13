// import vues
import Vue from 'vue'
import App from './App.vue'

// vuex datastore
import {store} from './store'

// http stuff
import VueResource from 'vue-resource'
Vue.use(VueResource)

// firebase
import VueFire from 'vuefire'
Vue.use(VueFire)

// awesome icons
// cheaper to import them as you need them
import 'vue-awesome/icons/bar-chart'
import 'vue-awesome/icons/upload'
import 'vue-awesome/icons/chevron-circle-right'
import 'vue-awesome/icons/chevron-circle-left'
// import 'vue-awesome/icons'  // !! warns bundles all icons = 500kB
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)


// setup global event bus that components can register with
export const bus = new Vue()

// my global helper functions // todo include somehow in another file
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
