import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import locale from "element-ui/lib/locale/lang/en";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import api_ from './api'
import *as echarts from 'echarts'


// 使用element ui
Vue.use(ElementUI, {locale})
// 使用echarrts
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
axios.defaults.baseURL = api_.baseURL
Vue.prototype.$http = axios
Vue.prototype.api = api_
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
