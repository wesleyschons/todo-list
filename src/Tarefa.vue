<template>
    <div class="tarefa" :concluida="done" @click="setTaskState">
        <slot name="descricao"></slot>
        <span class="fechar" @click.prevent="deleteTask">x</span>
    </div>
</template>

<script>
import barramento from './barramento.js'
export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
        done: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        setTaskState() {
            barramento.taskStateChange(this.id)
        },
        deleteTask() {
            barramento.deleteTask(this.id)
        }
    }

}
</script>

<style scoped>
    .tarefa {
        display: flex;
        position: relative;
        cursor: pointer;
        height: 100px;
        width: 230px;
        color: #fff;
        margin: 5px;
        vertical-align: middle;
        border-radius: 5px;
        border-left: 8px solid #6d2c2c67;
        background-color: #c93737;
        text-align: center;
    }
    .tarefa .fechar {
        z-index: 1;
        height: 15px;
        display: inline;
        color: #fff;
        width: 15px;
        border-radius: 50%;
        background-color: #6d2c2c67;
        position: absolute;
        line-height: 10px;
        right: 5px;
        top: 5px;
    }
    .tarefa .fechar:hover {
        
        background-color: #6d2c2c;
    }
    .tarefa > p {
        margin: 0 auto;
        align-self: center;
    }
    .tarefa[concluida] {
        border-left: 8px solid #30a15b;
        background-color: #2c7c18;
        text-align: center;
        text-decoration: line-through;
    }
</style>