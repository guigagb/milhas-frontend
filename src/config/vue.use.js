import Vue from 'vue';
import interceptor from '@/js/interceptor';
import Notification from '@mathieustan/vue-notification';
import VueSimpleAlert from "vue-simple-alert";
import VueMask from 'v-mask';
import VeeValidate from "vee-validate";
import VuetifyMoney from '@/components/VuetifyMoney/VuetifyMoney.vue';

interceptor();

Vue.use(Notification, {
  breakpoints: {
    480: {
      top: true,
      right: true
    }
  }
});

Vue.use(VueMask);

Vue.use(VueSimpleAlert, {
  reverseButtons: true,
  cancelButtonText: 'Cancelar',
  confirmButtonColor: '#9155fd'
});

Vue.use(VeeValidate);

Vue.use(VuetifyMoney);