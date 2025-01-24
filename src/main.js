import { createApp } from 'vue'
import './style.css'
import axios from "axios";
import App from './App.vue'
import router from "./router";

import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, far, fas)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)


app.config.globalProperties.BaseURL = "http://192.168.1.70:4000";
// app.config.globalProperties.BaseURL = "http://192.168.1.100:3000/";

app.use(router);
app.mount('#app');
let token = JSON.parse(localStorage.getItem("token"));
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

