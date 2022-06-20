<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const todo = ref([]);

const getTodoList = async () => {
    axios.get("http://127.0.0.1:3001/tasks/", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
    })
    .then((res) => {
        if (res.data.data) {
            const size = res.data.data.tasks.length
            todo.value = res.data.data.tasks[ Math.floor(Math.random() *  size)];
        }   
    })
    .catch((err) => {
        console.log(err)
        error.value = "Une erreur s'est produite";
    });
    
};
onMounted(() => {
    getTodoList();
})
</script>
<template>


    <div>
        <h1>Random</h1>
        <p>{{todo.description}} - {{todo.done}}</p>

    </div>

</template>