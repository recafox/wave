
// --------套件
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';

// --------Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSearch, faMinus, faPlus, faSignOutAlt, faShoppingCart, faArrowRight, faBell,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare, faInstagram, faTwitter, faGithub,
} from '@fortawesome/free-brands-svg-icons';

// --------Filter

// --------VeeValidate
import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from '../node_modules/vee-validate';

import { email, required, numeric } from '../node_modules/vee-validate/dist/rules';
import timeFormat from './Filters/timeFormat';
import router from './router/index';

// -----Vue
import App from './App.vue';
import './bus';

library.add(faSearch, faSignOutAlt, faArrowRight, faShoppingCart, faMinus, faPlus, faBell);
library.add(faInstagram, faFacebookSquare, faTwitter, faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.filter('converseTime', timeFormat);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
extend('email', {
  ...email,
  message: '郵件地址不正確',
});

extend('required', {
  ...required,
  message: '這是必填欄位',
});

extend('numeric', {
  ...numeric,
  message: '請輸入正確電話號碼',
});


Vue.config.productionTip = false;


Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');


// 檢查用戶是否登入
router.beforeEach((to, from, next) => {
  next();
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
