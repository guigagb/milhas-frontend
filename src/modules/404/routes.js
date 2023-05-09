const routes = [
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "login" */ '@/modules/404/404.vue'),
    meta: {
      layout: 'blank'
    },
  }
]

export default routes