import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
library.add(fal, fab, fas, far);
dom.watch();

import Axios from "axios";

Vue.prototype.$axios = Axios;
//Axios.defaults.baseURL = "http://192.168.0.3:8080/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
