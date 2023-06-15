import { axios } from '@/js/axios';

const getAssinaturas = async () => {
  const { data } = await axios.get('assinaturas');
  return data;
};

const getAssinatura = async (id_assinatura) => {
  const { data } = await axios.get(`assinaturas/${id_assinatura}`);
  return data;
};

const insertAssinatura = async (param) => {
  const { data } = await axios.post('assinaturas', param);
  return data;
};

const updateAssinatura = async (id_assinatura, param) => {
  const { data } = await axios.put(`assinaturas/${id_assinatura}`, param);
  return data;
};

const deleteAssinatura = async (id_assinatura) => {
  await axios.put(`assinaturas/${id_assinatura}`, {
    ativa: 'N'
  });
};

const getParceiros = async () => {
  const { data } = await axios.get('parceiros');
  return data;
};

export default {
  getAssinaturas,
  getAssinatura,
  insertAssinatura,
  updateAssinatura,
  deleteAssinatura,
  getParceiros,
};