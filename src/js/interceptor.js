import { axios } from "@/js/axios";
import store from "../store";

export default () => {
  axios.interceptors.response.use(
    res => {
      return res;
    },
    error => {
      if (error.message.indexOf('401') > -1) {
        store.commit('logout');
        throw new Error('Sem pemissão de acesso, faça login novamente!');
      }

      if (error.message.indexOf('500') > -1) {
        throw new Error('Requisição falhou (500)');
      }

      if (error.message.indexOf('Network Error') > -1) {
        throw new Error('Erro de Conexão (Network Error)');
      }

      if (error.response && error.response.data && error.response.data.message)
        throw new Error(error.response.data.message);

      if (error.message)
        throw new Error(error.message);

      throw new Error('Erro Desconhecido ;)');

    }
  );
};