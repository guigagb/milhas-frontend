import Vue from 'vue';

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VuetifyMoney from '@/components/VuetifyMoney/VuetifyMoney.vue';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('vuetify-money', VuetifyMoney);