import { createStore } from "vuex";
import * as jose from 'jose'
// Create a new store instance.
const decode = (token) => {
    try {
        if(token){
            const claims = jose.decodeJwt(token);
            return claims;
        }
        return {name : null, email: null};
    }
    catch (e) {
        console.log(e);
        return {name : null, email: null};
    }
}

export const userStore = createStore({
    state() {
        console.log(decode(localStorage.getItem('token')));
        const data = decode(localStorage.getItem('token'));
        return {
            name: data.name,
            email: data.email,
            connected: data.name ? true : false
        };
    },
    mutations: {

        logout(state) {
            localStorage.removeItem("token");
            localStorage.removeItem("task");
            state.name = null;
            state.email = null;
            state.connected = false;
        },
        login(state, data) {
            localStorage.setItem('token', data.token);
            state.name = data.user.name;
            state.email = data.user.email;
            state.connected = true;
        }
    },
});
