import Vue from 'vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Vue.component('Home', () => import('@/modules/home/Home.vue')),
    meta: {
      title: 'Home',
      showLeftMenu: true,
      icon: 'mdi-home',
      shortMenu: true,
      requiresAuth: true,
    }
  },
]

export default routes