import Vue from 'vue';

const routes = [
  {
    path: '/Vendas',
    name: 'Vendas',
    component: Vue.component('Vendas', () => import('@/modules/vendas/pages/Vendas.vue')),
    meta: {
      title: 'Vendas',
      icon: 'mdi-cash-multiple',
      grupo: 'Operações',
      showLeftMenu: true,
      shortMenu: true,
      requiresAuth: true,
    }
  },
];

export default routes;