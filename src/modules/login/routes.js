const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/modules/login/Login.vue'),
    meta: {
      layout: 'blank'
    },
  }
]

export default routes