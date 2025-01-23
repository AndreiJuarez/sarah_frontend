<template>
    <section class='flex flex-col md:flex-row h-screen items-center'>
        <div class='h-screen lg:block md:w-1/2 xl:w-2/3'>
            <img src='\src\images\bg-log.png' class="w-full h-full object-cover" />
        </div>

        <div
            class='bg-white flex items-center justify-center md:mx-auto md:max-w-md lg:max-w-full w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:p-12'>
            <div class='w-full h-100'>
                <h1 class='text-xl font-bold'>SARAH Login Landing Page</h1>
                <h1 class='text-xl md:text-2xl font-bold leading-tight mt-12'>Accede a tu cuenta</h1>

                <div class='mt-6'>
                    <div>
                        <label class='block text-gray-700'>Nombre de usuario</label>
                        <input type="text" v-model="form.user"
                            class='w-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg px-4 py-3' />
                    </div>
                    <div class='mt-4'>
                        <label class='block text-gray-700'>Contraseña</label>
                        <input type="password" v-model="form.password" placeholder='Ingresa contraseña'
                            class='w-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg px-4 py-3' />
                    </div>
                    <div class='text-right mt-2'>
                        <a href="#"
                            class='text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700 focus:outline-none'>Olvide
                            mi contraseña</a>
                    </div>
                    <button @click="login()"
                        class='w-full bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none'>Log
                        In</button>

                    <hr class='my-6 border-gray-300 w-full' />

                    <p class='mt-8'>
                        ¿Necesitas una cuenta?
                        <button class='text-blue-500 hover:text-blue-700' @click="this.$router.push('/registro')">
                            Crea cuenta
                        </button>
                    </p>

                    <p class='text-sm text-gray-500 mt-12'>
                        &copy; 2022 SARAH Powered By Andrei Juarez
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data: function () {
        return {
            form: { user: "", password: "" },
            url: this.BaseURL,
        }
    },
    methods: {
        login() {
            // console.log("Inicio de sesion")
            let user = this.form.user
            let password = this.form.password
            console.log(user, password);
            
            if (user !== "" && password !== "") {
                console.log(this.url + "/login", { name: this.form.user, password: this.form.password});
                
                axios
                    .post(this.url + "/login", { name: this.form.user, password: this.form.password })
                    .then((resp) => {
                        console.log(resp);
                        
                        if(resp.data.status_db === false){
                            alert("Usuario o contraseña incorrectos")
                            return
                        }else{
                            this.$router.push({ path: "/dashboard" });
                            console.log(resp)
                        }
                        // axios.defaults.headers.common["Authorization"] =
                        //     "Bearer " + resp.data.token;
                        // localStorage.setItem(
                        //     "token",
                        //     JSON.stringify(resp.data.token)
                        // );
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    },
    mounted() {
        const token = localStorage.getItem('token')

        if (token) {
            this.$router.push({ path: `/dashboard` })
        }
    }
}
</script>

<style>

</style>