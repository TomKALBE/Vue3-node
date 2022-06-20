<script setup>
import { RouterLink } from 'vue-router';
import { userStore } from "@/service/userStore";
import { ref } from 'vue';
const user = ref(userStore.state);
</script>

<template>
    <template v-if="user.name">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/todolist">Todolist</RouterLink>
        <RouterLink to="/logout">Déconnexion</RouterLink>
    </template>
    <RouterLink to="/about">A propos</RouterLink>
    <RouterLink to="/random">Au hasard</RouterLink>
    <template v-if="!user.name">
        <RouterLink to="/login">Connexion</RouterLink>
        <RouterLink to="/register">Inscription</RouterLink>
    </template>

  <router-view path="/"></router-view>
</template>

<style>
  .button_link a{
    text-decoration: none;
    color: #000;
  }
  *{
    margin-left: 8px;
    margin-bottom: 2px;
    margin-right: 8px;

    padding: 0;
  }
</style>
