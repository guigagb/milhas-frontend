import store from '@/store';
import { defaultAxios } from '@/js/axios';
import moment from 'moment';

export const validarObr = (el) => {
  var toReturn = true;
  let element = el ? document.querySelector(el) : document;
  element.querySelectorAll(".obr input, input.obr").forEach((el) => {
    if (toReturn === false)
      return false;

    if (el.parentElement.className != 'v-select__selections') {
      let label = el.getAttribute('apelido') || el.parentElement.children[0].innerHTML;

      if (el.value === '' || el.value === '-1' || el.value == null || el.value == undefined) {
        store.$notify.error('O campo ' + label + ' deve ser preenchido!');
        el.focus();
        toReturn = false;
      }
    }

  });

  return toReturn;

};

export const formatarSimNao = function (value) {
  if (value === 'S' || value == '1')
    return 'SIM';
  else if (value === 'N' || value == '0')
    return 'NÃO';
  else
    return '';
};

export const formatarValorBR = function (vlr, qtdDecimais = 2) {
  if (vlr == undefined)
    vlr = 0;
  if (typeof (vlr) == 'string')
    vlr = parseFloat(vlr);
  return vlr.toFixed(qtdDecimais).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
};

export const formatarInteiro = function (vlr) {
  if (vlr == undefined)
    vlr = 0;
  if (typeof (vlr) == 'string')
    vlr = parseFloat(vlr);
  return vlr.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
};

export const formatarValorUSA = function (num) {
  return parseFloat(num.replace(/\./g, '').replace(/,/g, '.'));
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const formatarDataBR = (dt) => {
  if (!dt)
    return '';

  let data = dt.substr(0, 10);
  data = data.split(/\.|-|\//g).reverse().join('/');
  return data;
};

export const formatarDataUSA = (dt, separador = '/') => {
  if (!dt)
    return '';

  let data = dt.substr(0, 10);

  data = data.split(/\.|-|\//g).reverse().join(separador);
  return data;
};

/**
 * Recebe um timestamp no formato 1970-01-01T20:08:33.000Z
 * @param {string} hora - Hora no formato: 1970-01-01T20:08:33.000Z
 * @returns {string} - retorna uma string no formato HH:mm:ss
 */
export const formatarHoraBR = (hora) => {
  if (!hora)
    return '';

  hora = moment(hora).format('HH:mm:ss');
  return hora;
};

export const getElementsSubmit = (event) => {
  let dados = event.target.querySelectorAll("input[name]");
  let resp = {};

  for (let ln of dados) {
    let name = ln.name;
    let value = ln.value || undefined;

    if (value !== undefined) {
      let number = value.replaceAll(/\./g, '').replace(',', '.');

      if (typeof value == 'object') {
        value = value.value;
      }

      // conversão de data
      if (value.length == 10 && value.search(/\d{2}(\/|-)\d{2}(\/|-)\d{4}/g) > -1) {
        value = value.split(/\/|-/g).reverse().join('-');
      }
      // conversão de decimal
      else if (!isNaN(number)) {
        value = parseFloat(number);
      }
      else {
        value = value.toUpperCase();
      }

      resp[name] = value;
    }

  }

  return resp;
};

export const clearFormVue = (el) => {
  el.$children.map(ln => {
    if (ln.clear)
      ln.clear();
  });
};

/**
 * Abre um modal com um input para confirmação de código antes de realizar determinada ação.
 * @param {*} title - Título do alerta.
 * @param {*} message - Mensagem do alerta.
 * @param {*} type - Tipo que determina o ícone do alerta: 'success' | 'error' | 'warning' | 'info' | 'question'
 * @returns {Promisse} - Retorna uma promisse que aguarda a ação do usuário.
 */
export const confirmarCodigo = (title = '', message = '', type = 'question') => {
  let codigo = Math.floor(Math.random() * 999999);
  message += ``;

  // sweetAlertOptions https://sweetalert2.github.io/
  let options = {
    html: message + `<br><span>Confirme o código <b>${codigo}</b> </span>`,
    preConfirm: (value) => {

      if (value != codigo) {
        store.$notify.error('O código informado não é valido!');
        return false;
      }

      return true;

    }
  };

  return store.$prompt(message, '', title, type, options);

};

export const confirmar = (message, title = 'Confirmação', type = 'question') => {
  return store.$confirm(message, title, type);
};

export const validarEmail = (email) => {
  const valido = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return valido ? true : false;
};

export const sanitizarDadosForm = (data) => {
  const dadosSanitizados = {};

  Object.keys(data).forEach(chave => {
    let value = data[chave];

    if (value === '')
      value = null;

    dadosSanitizados[chave] = value;
  });

  return dadosSanitizados;

};

export const buscarCEP = (cep) => {

  cep = cep.replace('-', '');

  return defaultAxios.get(`https://viacep.com.br/ws/${cep}/json/`);

};

export const validarCPF = (cpf) => {

  var sum;
  var rest;
  sum = 0;

  cpf = cpf.toString().padStart(11, '0');
  let strCPF = cpf.replace(/[.-]/g, '');

  if (strCPF == "00000000000") return false;

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) rest = 0;
  if (rest != parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) rest = 0;
  if (rest != parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

export const validarCNPJ = (cnpj) => {

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14)
    return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(0)))
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(1)))
    return false;

  return true;

};

function keyInRegex(event, regex) {
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

export const onKeypressDNP = (event) => {
  const regex = /\d|\//g;
  keyInRegex(event, regex);
};

export const onKeypressFloat = (event) => {
  const regex = /\d|\./g;
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (key === ',') {
    event.charCode = '.';
    event.which = '.';
  }
  keyInRegex(event, regex);
};

export const validarData = (data) => {
  let regexData = /^\d{4}-\d{2}-\d{2}$/; // Expressão regular para validar o formato 'yyyy-mm-dd'

  if (!regexData.test(data)) { // Se a data não estiver no formato correto
    return false;
  }

  let ano = parseInt(data.substr(0, 4));
  let mes = parseInt(data.substr(5, 2)) - 1; // O mês começa em 0 no objeto Date
  let dia = parseInt(data.substr(8, 2));

  let novaData = new Date(ano, mes, dia);

  return novaData.getFullYear() == ano && novaData.getMonth() == mes && novaData.getDate() == dia;
};

export const temCache = (caches, chave) => {

  return caches.find(cache => cache === chave);

};