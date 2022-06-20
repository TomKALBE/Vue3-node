<script setup>
import axios from 'axios';
import { ref } from 'vue';


const props = defineProps(['id', 'description', 'done', 'getTodoList']);
const displayForm = ref(false);
const error = ref("");
const description = ref(props.description);
const done = ref(props.done);

const displays = () => {
    displayForm.value = !displayForm.value
}
const cancel = () => {
    description.value = props.description;
    done.value = props.done;
    displayForm.value = false;
}
const deleteTask = async () => {
    console.log(description.value, done.value)
    axios.delete("http://127.0.0.1:3001/tasks/" + props.id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    })
    .then((res) => {
        console.log(res)
        if(res.status === 200){
            props.getTodoList()
            error.value = ""
        }
        else{
            console.log("erreur")
        }
    })
    .catch((err) => {
        console.log(err)
        error.value = "Une erreur s'est produite";
    });
}

const editTask = async () => {
    console.log(description.value, done.value)
    axios.put("http://127.0.0.1:3001/tasks/" + props.id, {
        description: description.value,
        done: done.value,
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    })
    .then((res) => {
        console.log(res)
        if(res.status === 200){
            props.getTodoList()
            error.value = ""
        }
        else{
            console.log("erreur")
        }
    })
    .catch((err) => {
        console.log(err)
        error.value = "Une erreur s'est produite";
    });
}

</script>

<template>

    <div>
        <a :onclick="displays">{{props.description}} - {{props.done}}</a>
        <button :onclick="deleteTask">Supprimer</button>
    </div>

    <div id="form" v-if="displayForm">
        <form @submit.prevent="editTask">
            <input v-model="description">
            <input type="checkbox" v-model="done"> 
            <button type="submit">Modifier</button>
        </form>
        <button :onclick="cancel">Annuler</button>
        <p v-if="error">{{error}}</p>
    </div>

</template>
<style scoped>
#form{
    display:flex;   
}
</style>