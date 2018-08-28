import Vue from 'vue'
import VueRouter from 'vue-router'

import BodyHero from './components/body/BodyHero.vue'
import SelectedHero from './components/body/SelectedHero.vue'
import GridHero from './components/body/gridHero.vue'

Vue.use(VueRouter)

console.log(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: GridHero//BodyHero
    },
    {
      path: '/:id',
      component: SelectedHero
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
