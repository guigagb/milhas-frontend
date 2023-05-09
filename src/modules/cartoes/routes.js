import Vue from 'vue';

const routes = [
  {
    path: '/cartoes',
    name: 'Cartoes',
    component: Vue.component('Cartoes', () => import('@/modules/cartoes/pages/Cartoes.vue')),
    meta: {
      title: 'Cartões',
      icon: 'mdi-credit-card',
      grupo: 'Cadastros',
      showLeftMenu: true,
      shortMenu: true,
      requiresAuth: true,
    }
  },
];

export default routes;