import {createRouter, createWebHistory}  from 'vue-router'
import Login from '@/Views/Login.vue'
import Register from '@/Views/Register.vue'
import Home from '@/Views/Home.vue'
import Random from '@/Views/Random.vue'
import Todolist from '@/Views/Todolist.vue'
import About from '@/Views/About.vue'

import { userStore } from "@/service/userStore";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/todolist', name: 'Todolist', component: Todolist},
        {path: '/about', name: 'About', component: About},
        {path: '/random', name: 'Random', component: Random},
        {path: '/login', name: 'Login', component: Login},
        {path: '/register', name: 'Register', component: Register},
        {path: '/logout', name: 'logout', beforeEnter: () => {
          userStore.commit('logout');
          router.push('/login');
        }},

    ]
})
router.beforeEach(async (to, from) => {
    const token = localStorage.getItem('token') ?? null;
    if (
      // make sure the user is authenticated
      !token &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Random' && to.name !== 'About'
    ) {
      // redirect the user to the login page
      return { name: 'Login' }
    }
    else if(token && (to.name === 'Login' || to.name === 'Register')){
      return { name: 'Home' }
    }
  })