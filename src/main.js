import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from "./store";
import './plugins/vee-validate/extendValidations'
import './config/vue.components'
import './config/vue.use'
import './config/vue.filters'

Vue.config.productionTip = false

let vm = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

vm.$store.$notify = vm.$notify
vm.$store.$confirm = vm.$confirm

export default vm