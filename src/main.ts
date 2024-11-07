import "virtual:uno.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routers";
import Ripple from "primevue/ripple";
import ToastService from "primevue/toastservice";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import Button from "primevue/button";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  theme: {
      preset: Aura,
      options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
      }
  }
});

app.directive("ripple", Ripple);
app.component("Button", Button);
app.use(ToastService);

app.use(pinia);
app.use(router);

app.mount("#app");
