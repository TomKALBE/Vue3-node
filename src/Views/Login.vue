<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { router } from '../router/index'
import { userStore } from '../service/userStore'
import { loginValidator } from '../validators/userValidator'
const email = ref('')
    const password = ref('')
    const errors = ref([])
    
    const validateFields = () => {
        errors.value = [];
        const {error, value} = loginValidator.validate({email : email.value, password : password.value}, {abortEarly : false});
        if (error && error.details) {
            errors.value = error.details;
            return false
        }
        return login()
    }
    const login = () => {
        axios.post('http://127.0.0.1:3001/users/authenticate', {
            email: email.value,
            password: password.value
        })
        .then(res => {
            if(res.status === 401){
                console.log("res data",res.data)
            }

            userStore.commit("login", res.data.data );
            router.push({path: '/'})

        })
        .catch(err => {
            console.log("error loging", err)
            if(err.response.status === 401){
                errors.value = [{
                    message : "Invalid email or password"
                }]
            }
        })
    }

</script>

<template>
    <div>
        <h2>Page de connexion</h2>
        <input v-model="email" data-test-id="l_email" type="text" placeholder="Email">
        <input v-model="password" data-test-id="l_password" type="password" placeholder="Password">
        <div><button name="login" @click="validateFields">Connexion</button></div>
        <div v-if="errors.length">
            <ul>
                <li v-for="error in errors">{{error.message}}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>