import { axios } from '@/js/axios';

const getComprasBonificadas = async () => {
  const { data } = await axios.get('compras-bonificadas');
  return data;
};

const getCompraBonificada = async (id_compra_bonificada) => {
  const { data } = await axios.get(`compras-bonificadas/${id_compra_bonificada}`);
  return data;
};

const insertCompraBonificada = async (param) => {
  const { data } = await axios.post('compras-bonificadas', param);
  return data;
};

const updateCompraBonificada = async (id_compra_bonificada, param) => {
  const { data } = await axios.put(`compras-bonificadas/${id_compra_bonificada}`, param);
  return data;
};

const deleteCompraBonificada = async (id_compra_bonificada) => {
  await axios.delete(`compras-bonificadas/${id_compra_bonificada}`);
};

const getParceiros = async () => {
  const { data } = await axios.get('parceiros');
  return data;
};

export default {
  getComprasBonificadas,
  getCompraBonificada,
  insertCompraBonificada,
  updateCompraBonificada,
  deleteCompraBonificada,
  getParceiros,
};