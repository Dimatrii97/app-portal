import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import VueResourse from "vue-resource";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import "./plugins/filters/dateFilers";
import "./plugins/directives/click-outside";

const socket = io("http://localhost:5000/", {
  autoConnect: false,
  query: {
    token: null
  }
});
Vue.use(VueSocketIOExt, socket, { store });
Vue.use(Vuelidate);
Vue.use(VueResourse);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
