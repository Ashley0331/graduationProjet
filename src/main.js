// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(ElementUI,VueAxios,axios);
Vue.prototype.$http=axios;
axios.defaults.baseURL="http://localhost:60624/";
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});


// import Vue from 'vue'
// import App from './App'


// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })