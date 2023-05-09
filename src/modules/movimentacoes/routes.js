import Vue from 'vue';

const routes = [
  {
    path: '/Movimentacoes',
    name: 'Movimentacoes',
    component: Vue.component('Movimentacoes', () => import('@/modules/movimentacoes/pages/Movimentacoes.vue')),
    meta: {
      title: 'Movimentações',
      icon: 'mdi-text-box-outline',
      grupo: 'Operações',
      showLeftMenu: true,
      shortMenu: true,
      requiresAuth: true,
    }
  },
];

export default routes;