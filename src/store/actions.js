import { axios } from '@/js/axios';

// eslint-disable-next-line no-unused-vars
export const login = (_rootState, { codigo, email, senha }) => {
  return axios.post('auth/login', {
    codigo,
    email,
    senha
  });
};

export const getMoedasCotacoes = async () => {
  const { data } = await axios.get('cotacoes');
  return data;
};

export const getLojas = async () => {
  const { data } = await axios.get('lojas');
  return data;
};