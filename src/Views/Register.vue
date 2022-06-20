//Vue component

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { registerValidator } from '@/validators/userValidator';

const email = ref('')
const name = ref('')
const password = ref('')
const success = ref('')
const errors = ref([])

const validateFields = () => {
    errors.value = [];
    const {error, value} = registerValidator.validate({email : email.value, name : name.value, password : password.value}, {abortEarly : false});
    if (error && error.details) {
        errors.value = error.details;
        return false
    }
    return register()
}

const register = () => {
    axios.post('http://127.0.0.1:3001/users/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    .then(res => {
        email.value = ''
        name.value = ''
        password.value = ''
        success.value = 'Votre compte a bien été créé connectez vous pas acceder à votre compte'

    })
    .catch(err => {
      console.log(err)
    })
  }
</script>

<template>
    <div>
        <h2>Page d'inscription</h2>
        <input v-model="name" type="text" placeholder="Name">
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <div>
            <button @click="validateFields" name="register">Inscription</button>
        </div>
        <div v-if="success">
            <p style="color: darkseagreen;">{{success}}</p>
        </div>
        <div v-if="errors.length">
            <ul>
                <li v-for="error in errors">{{error.message}}</li>
            </ul>
        </div>
    </div>
    
</template>