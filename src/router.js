import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CardDetail from './views/CardDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/card/:set/:number/:name',
      name: 'card.detail',
      component: CardDetail,
      props: true
    }
  ]
})
