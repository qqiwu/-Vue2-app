import Vue from "vue";
import Vant from "vant";
import App from "./App.vue";
import router from "./router";
import "vant/lib/index.css"; // 导入css
import "amfe-flexible/index.js";
import store from "./store";
import bus from "@/util/bus";

Vue.use(Vant); // 中间件使用
Vue.config.productionTip = false;
Vue.prototype.$bus = bus;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
