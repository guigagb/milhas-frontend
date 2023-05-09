import Vue from 'vue';
import { formatarDataBR, formatarValorBR } from '@/js/util';
import moment from 'moment';
import { formatarInteiro } from '../js/util';

Vue.filter('noMask', function (value) {
  if (!value) return '';
  value = value.toString().replace(/\.|,|-/g);
  return value;
});

Vue.filter('dataBR', function (value) {
  if (!value) return '';
  value = formatarDataBR(value);
  return value;
});

Vue.filter('horaBR', function (value) {
  if (!value) return '';
  value = moment(value).format('HH:mm');
  return value;
});

Vue.filter('naoSim', function (value) {
  if (!value) return '';
  if (value === 'S')
    return 'Sim';
  else if (value === 'N')
    return 'Não';
});

Vue.filter('money', function (value) {
  if (!value) return '0,00';
  value = parseFloat(value).toFixed(2);
  value = formatarValorBR(value);
  return value;
});

Vue.filter('integer', function (value) {
  if (!value) return '0';
  value = parseFloat(value).toFixed(0);
  value = formatarInteiro(value, 0);
  return value;
});

Vue.filter('round', function (value) {
  if (!value) return 0;
  const quociente = Math.trunc(value);
  const resto = value % 2;
  return resto ? value : quociente;
});