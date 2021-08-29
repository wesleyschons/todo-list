<template>
  <div class="task-container">
    <input type="text" v-model="task" @keydown.enter="addTask" placeholder="Qual a descrição da tarefa?" />
    <button type="button" @click="addTask">+</button>
  </div>
</template>

<script>
import barramento from './barramento.js'
export default {
    data() {
        return {
            task: '',
        }
    },
    methods: {
        addTask() {
            if (this.task != '') {
                barramento.createTask(this.task)
                this.task = ''
            }
        },
    }
};
</script>

<style scoped>
*{outline: 0;}
.task-container {
  width: 300px;
  height: 30px;
  display: flex;
  padding: 15px 0;
  margin: 0;
}
.task-container>input {
    flex: 1;
    
    border: 1px solid #fff;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.task-container>button {
    cursor: pointer;
    float: left;
    border: 1px solid #fff;
    width: 25px;
    color: #fff;
    background-color: #1f74ad;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.task-container>button:hover {
    background-color: #145480;
}
</style>