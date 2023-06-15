import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes as routesHome } from '@/modules/home';
import { routes as routesLogin } from '@/modules/login';
import { routes as routesCartoes } from '@/modules/cartoes';
import { routes as routesAssinaturas } from '@/modules/assinaturas';
import { routes as routesComprasBonificadas } from '@/modules/comprasBonificadas';
import { routes as routesMovimentacoes } from '@/modules/movimentacoes';
import { routes as routesTransferencias } from '@/modules/transferencias';
import { routes as routesVendas } from '@/modules/vendas';
import { routes as routes404 } from '@/modules/404';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  ...routesHome,
  ...routesLogin,
  ...routes404,
  ...routesCartoes,
  ...routesComprasBonificadas,
  ...routesMovimentacoes,
  ...routesTransferencias,
  ...routesAssinaturas,
  ...routesVendas,
  {
    path: '*',
    redirect: '404',
  },
];

const router = new VueRouter({
  routes
});

export default router;
