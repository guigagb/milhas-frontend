import Vue from 'vue';

const routes = [
  {
    path: '/assinaturas',
    name: 'Assinaturas',
    component: Vue.component('Assinaturas', () => import('@/modules/assinaturas/pages/Assinaturas.vue')),
    meta: {
      title: 'Assinaturas',
      icon: 'mdi-shopping',
      grupo: 'Cadastros',
      showLeftMenu: true,
      shortMenu: true,
      requiresAuth: true,
    }
  },
];

export default routes;