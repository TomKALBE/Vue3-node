<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Task from '@/components/Task.vue'
const task_ = ref(localStorage.getItem('task'));
console.log(localStorage.getItem('task'))
const todolist = ref([]);
const error = ref([]);

const test = () => {
    console.log(task_)
    localStorage.setItem('task', task_.value)
}

const addTask = async () => {
    axios.post("http://127.0.0.1:3001/tasks/", {
            description: task_.value,
            done: false,
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
            
    })
    .then((res) => {
        console.log(res)
        if(res.status === 201){
            getTodoList()
            task_.value = "";
            error.value = "";
            localStorage.remove("task")
        }
        else{
            console.log("erreur")
        }
    })
    .catch((err) => {
        error.value = "Une erreur s'est produite";
    });
}
const getTodoList = async () => {

    axios.get("http://127.0.0.1:3001/tasks/", {
            
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
    })
    .then((res) => {
        if (res.data.data) {
            console.log(res.data.data.tasks)
            todolist.value = res.data.data.tasks;
            error.value = "";
        }
    })
    .catch((err) => {
        error.value = "Une erreur s'est produite";
    });
    
};
onMounted(() => {
    getTodoList();
});
</script>

<template>
    <div>
        <h1>Todolist</h1>
        <div v-if="todolist">
            <ul>
                <li v-for="task in todolist">
                    <Task :getTodoList="getTodoList" :id="task.id" :description="task.description" :done="task.done"/>
                </li>
            </ul>
        </div>
        <h3>Ajouter une nouvelle tâche</h3>
        <form @submit.prevent="addTask">
            <input v-model="task_" :onchange="test">
            <button type="submit">Ajouter la tâche</button>
        </form>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<style scoped>

</style>