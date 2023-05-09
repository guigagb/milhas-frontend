import router from '../router';
import { axios } from '@/js/axios';
import { temCache } from '../js/util';

export default {
  setUsuario(state, value) {
    state.usuario = JSON.parse(value);
    sessionStorage.setItem('usuario', value);
    axios.defaults.headers.common['Authorization'] = state.usuario.token;
  },
  setMoedasCotacoes(state, value) {
    state.moedas = value;
    sessionStorage.setItem('moedas', value);
  },
  setLojas(state, value) {
    state.lojas = value;
    sessionStorage.setItem('lojas', value);
  },
  logout(state) {
    state.usuario = undefined;
    sessionStorage.removeItem('usuario');
    axios.defaults.headers.common['Authorization'] = undefined;
    router.push('login');
  },
  setLoading(state, value) {
    state.loading = value;
  },
  setDark(state, value) {
    state.dark = value;
  },
  adicionarCache(state, chave) {
    if (temCache(state.caches, chave)) return;

    state.caches.push(chave);
  },
  invalidarCache(state, chave) {

    const invalidar = (chaveParaInvalidar) => {
      const indexCache = state.caches.findIndex(cache => cache === chaveParaInvalidar);
      if (indexCache !== undefined) {
        state.caches.splice(indexCache, 1);
      }
    };

    if (Array.isArray(chave)) {
      chave.forEach(chave => invalidar(chave));
    } else {
      invalidar(chave);
    }

  },
  limparCache(state) {
    state.caches = [];
    console.log(state.caches);
  }
};