import { axios } from '@/js/axios';

const getDadosDashboard = async () => {
  const { data } = await axios.get(`dashboard`);
  return data;
};

export default {
  getDadosDashboard,
};