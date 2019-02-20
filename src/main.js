import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import iView from 'iview';
import './plugins/iview.less';
import './styles/index.scss';

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
