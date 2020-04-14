import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import http from './http'
import './directives';
import './filters';

//element-ui
import ElementUI from 'element-ui';
//components
import VHeader from './components/common/vv-header.vue';

Vue.config.productionTip = false;

Vue.use(http);
Vue.use(ElementUI);
Vue.component(VHeader.name, VHeader);



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
