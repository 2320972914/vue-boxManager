import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
   // 存放的键值对就是管理状态
   name: "hello"
    }
  })
  export default store;