import Vue from 'vue'
import 'gsap/CSSPlugin'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import './assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
