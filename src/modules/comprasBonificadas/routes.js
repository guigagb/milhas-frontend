import Vue from 'vue';

const routes = [
  {
    path: '/ComprasBonificadas',
    name: 'ComprasBonificadas',
    component: Vue.component('ComprasBonificadas', () => import('@/modules/comprasBonificadas/pages/ComprasBonificadas.vue')),
    meta: {
      title: 'Compras Bonificadas',
      icon: 'mdi-cart',
      grupo: 'Operações',
      showLeftMenu: true,
      shortMenu: true,
      requiresAuth: true,
    }
  },
];

export default routes;