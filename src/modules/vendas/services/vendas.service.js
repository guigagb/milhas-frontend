import { axios } from '@/js/axios';

const getVendas = async () => {
  const { data } = await axios.get('vendas');
  return data;
};

const getVenda = async (id_venda) => {
  const { data } = await axios.get(`vendas/${id_venda}`);
  return data;
};

const insertVenda = async (param) => {
  const { data } = await axios.post('vendas', param);
  return data;
};

const updateVenda = async (id_venda, param) => {
  const { data } = await axios.put(`vendas/${id_venda}`, param);
  return data;
};

const deleteVenda = async (id_venda) => {
  await axios.delete(`vendas/${id_venda}`);
};

const getParceiros = async () => {
  const { data } = await axios.get('parceiros', {
    params: {
      showSaldo: 'S',
    }
  });
  return data;
};

const getPlataformasVendas = async () => {
  const { data } = await axios.get('plataformas-vendas');
  return data;
};

export default {
  getVendas,
  getVenda,
  insertVenda,
  updateVenda,
  deleteVenda,
  getParceiros,
  getPlataformasVendas,
};