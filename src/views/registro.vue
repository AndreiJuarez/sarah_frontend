<template>
    <section class='flex flex-col md:flex-row h-screen items-center'>
        <div class='h-screen lg:block md:w-1/2 xl:w-2/3'>
            <img src='\src\images\bg-log.png' class="w-full h-full object-cover" />
        </div>

        <div
            class='bg-white flex items-center justify-center md:mx-auto md:max-w-md lg:max-w-full w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:p-12'>
            <div class='w-full h-100'>
                <h1 class='text-xl font-bold'>SARAH Registro Landing Page</h1>
                <h1 class='text-xl md:text-2xl font-bold leading-tight mt-12'>Crea una nueva cuenta</h1>

                <div class='mt-6'>
                    <div>
                        <label class='block text-gray-700'>Nombre de usuario</label>
                        <input type="text" v-model="form.user"
                            class='w-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg px-4 py-3' />
                    </div>
                    <div>
                        <label class='block text-gray-700'>Correo electronico</label>
                        <input type="email" v-model="form.email" placeholder='Correo@ejemplo.com'
                            class='w-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg px-4 py-3' />
                    </div>
                    <div class='mt-4'>
                        <label class='block text-gray-700'>Contraseña</label>
                        <input type="password" v-model="form.password" placeholder='Ingresa contraseña'
                            class='w-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg px-4 py-3' />
                    </div>

                    <p class='mt-8'>
                        Ingresa el código de invitación. Si es proyecto nuevo, dejalo en blanco
                        <input type="Text" v-model="form.invcode" placeholder='Código de invitación'
                            className='w-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg px-4 py-3' />
                    </p>

                    <button
                        class='w-full bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none'
                        @click="register()">Registrarse</button>

                    <hr class='my-6 border-gray-300 w-full' />

                    <!-- <p class='mt-8'>
                        ¿Necesitas una cuenta?
                        <button class='text-blue-500 hover:text-blue-700'>
                            Crea cuenta
                        </button>
                    </p> -->

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
    name: 'Register',
    data: function () {
        return {
            form: { user: "", email: "", password: "", invcode: "" },
            url: this.BaseURL,
        }
    },
    methods: {
        register() {

            const symbol = "!#$%&=_+-"
            const numbers = "0123456789"
            const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

            // let user = this.form.user
            // let email = this.form.email
            // let password = this.form.password
            let invcode = this.form.invcode

            // console.log("user", user)
            // console.log("email", email)
            // console.log("password", password)
            // console.log("invcode", invcode)

            if (invcode == "") {
                invcode = this.generateInvcode(invcode, numbers, upperLetters, symbol)
                axios
                    .post(this.url+"auth/register",{name: this.form.user, email: this.form.email, password:this.form.password, invcode: invcode})
                    .then((resp)=>{
                        console.log(resp)
                        this.$router.push({ path: "/" });
                    })
                    .catch((err)=>{
                        console.log("ERROR", err);
                    })
            }else{

            }
        },
        generateInvcode(invcode, numbers, upperLetters, symbol) {
            invcode = "S-"
            invcode = invcode + this.getNumber(numbers)
            invcode = invcode + this.getNumber(numbers)
            invcode = invcode + this.getUppercase(upperLetters)
            invcode = invcode + this.getUppercase(upperLetters)
            invcode = invcode + this.getSymbol(symbol)
            return invcode
        },
        getSymbol(array) {
            return array[Math.floor(Math.random() * array.length)]
        },
        getNumber(array) {
            return array[Math.floor(Math.random() * array.length)]
        },
        getUppercase(array) {
            return array[Math.floor(Math.random() * array.length)]
        }


    }
}

</script>

<style>

</style>