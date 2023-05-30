import { axios } from '@/js/axios';

const alterarSenha = async ({ senhaAtual, senhaNova }) => {
  const { data } = await axios.put(`usuarios/senha`, {
    senhaAtual,
    senhaNova,
  });
  return data;
};

export default {
  alterarSenha,
};