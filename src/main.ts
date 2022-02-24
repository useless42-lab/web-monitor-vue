import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';

import service from './service/index';

Vue.config.productionTip = false;
Vue.prototype.$service=service;

import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
