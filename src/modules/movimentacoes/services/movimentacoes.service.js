import { axios } from '@/js/axios';

const getMovimentacoes = async (page = 1) => {
  const { data } = await axios.get('movimentacoes', {
    params: {
      page
    }
  });
  return data;
};

const getMovimentacao = async (id_movimentacao) => {
  const { data } = await axios.get(`movimentacoes/${id_movimentacao}`);
  return data;
};

const insertMovimentacao = async (param) => {
  const { data } = await axios.post('movimentacoes', param);
  return data;
};

const updateMovimentacao = async (id_movimentacao, param) => {
  const { data } = await axios.put(`movimentacoes/${id_movimentacao}`, param);
  return data;
};

const creditarMovimentacao = async (id_movimentacao, param) => {
  const { data } = await axios.put(`movimentacoes/${id_movimentacao}/creditar`, param);
  return data;
};

const deleteMovimentacao = async (id_movimentacao) => {
  await axios.delete(`movimentacoes/${id_movimentacao}`);
};

const getParceiros = async () => {
  const { data } = await axios.get('parceiros');
  return data;
};

const getCartoes = async () => {
  const { data } = await axios.get('cartoes');
  return data;
};

export default {
  getMovimentacoes,
  getMovimentacao,
  insertMovimentacao,
  updateMovimentacao,
  creditarMovimentacao,
  deleteMovimentacao,
  getParceiros,
  getCartoes,
};