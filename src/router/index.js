import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/login.vue'
import Registro from '../views/registro.vue'
import Dashboard from '../views/dashboard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: "Login",
            component: Login
        },
        {
            path: '/dashboard',
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: '/registro',
            name: "Registro",
            component: Registro
        },
    ]
})

export default router;