// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import './assets/fonts/iconfont.css'
axios.defaults.baseURL = 'http://172.16.3.217:8000'
import axios from 'axios'
Vue.prototype.axios=axios
Vue.prototype.echarts=echarts
Vue.config.productionTip = false
import $ from 'jquery'



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
