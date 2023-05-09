import Vue from 'vue';

const routes = [
  {
    path: '/Transferencias',
    name: 'Transferencias',
    component: Vue.component('Transferencias', () => import('@/modules/transferencias/pages/Transferencias.vue')),
    meta: {
      title: 'Transferências',
      icon: 'mdi-sync',
      grupo: 'Operações',
      showLeftMenu: true,
      shortMenu: true,
      requiresAuth: true,
    }
  },
];

export default routes;