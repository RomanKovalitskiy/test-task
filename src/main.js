import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.filter("format", (value) => {
  // eslint-disable-next-line no-bitwise
  return (value ^ 0) === value ? value : value.toFixed(1);
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
