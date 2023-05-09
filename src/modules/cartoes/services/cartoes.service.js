import { axios } from '@/js/axios';

const getCartoes = async () => {
  const { data } = await axios.get('cartoes');
  return data;
};

const getCartao = async (id_cartao) => {
  const { data } = await axios.get(`cartoes/${id_cartao}`);
  return data;
};

const insertCartao = async (param) => {
  const { data } = await axios.post('cartoes', param);
  return data;
};

const updateCartao = async (id_cartao, param) => {
  const { data } = await axios.put(`cartoes/${id_cartao}`, param);
  return data;
};

const deleteCartao = async (id_cartao) => {
  await axios.put(`cartoes/${id_cartao}`, {
    ativo: 'N'
  });
};

export default {
  getCartoes,
  getCartao,
  insertCartao,
  updateCartao,
  deleteCartao
};