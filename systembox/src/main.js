// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Validator from 'vue-validator'
import axios from 'axios'
import store from './store'


Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Validator);
Vue.use(ElementUI);


axios.defaults.baseURL="http://localhost:8081/"
axios.interceptors.request.use(config=>{

  if("/common/login" !=config.url){
    if(localStorage.getItem("token")){
      config.headers["Authorization"]=
      "Bearer "+localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
    }
  }
  return config
},err=>{
  return Promise.reject(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App ,
  },
  template: '<App/>',

})
module.exports

