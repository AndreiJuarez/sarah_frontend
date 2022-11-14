import { createApp } from 'vue'
import './style.css'
import axios from "axios";
import App from './App.vue'
import router from "./router";

const app = createApp(App)


app.config.globalProperties.BaseURL = "http://localhost:3000/";
// app.config.globalProperties.BaseURL = "http://192.168.1.100:3000/";

app.use(router);
app.mount('#app');
let token = JSON.parse(localStorage.getItem("token"));
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

