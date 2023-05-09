import { axios } from '@/js/axios';

const getTransferencias = async () => {
  const { data } = await axios.get('transferencias');
  return data;
};

const getTransferencia = async (id_transferencia) => {
  const { data } = await axios.get(`transferencias/${id_transferencia}`);
  return data;
};

const insertTransferencia = async (param) => {
  const { data } = await axios.post('transferencias', param);
  return data;
};

const deleteTransferencia = async (id_transferencia) => {
  await axios.delete(`transferencias/${id_transferencia}`);
};

const getParceiros = async () => {
  const { data } = await axios.get('parceiros');
  return data;
};

const getParceirosMaisCartoes = async (dataLimite) => {
  const { data } = await axios.get('parceiros', {
    params: {
      showSaldo: 'S',
      showCartoes: 'S',
      dataLimite,
    }
  });
  return data;
};

const getCartoes = async () => {
  const { data } = await axios.get('cartoes');
  return data;
};

export default {
  getTransferencias,
  getTransferencia,
  insertTransferencia,
  deleteTransferencia,
  getParceiros,
  getParceirosMaisCartoes,
  getCartoes,
};