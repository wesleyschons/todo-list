<template>
    <div class='task-list'>
        <Tarefa v-for="t in tarefas" :key="t.id" :id="t.id" :done="t.concluida">
            <p slot="descricao">{{t.descricao}}</p>    
        </Tarefa>
    </div>
</template>

<script>
import Tarefa from './Tarefa.vue'
import barramento from './barramento.js'
export default {
    components: {Tarefa},
    created() {
        barramento.onTaskDelete(task => {
            this.removeById(task)
        })
        barramento.onTaskCreate(task => {
            this.insertTask(task)
        })
        barramento.taskStateChanged(task => {
            this.updateState(task)
        })
        

        const json = localStorage.getItem('tarefas')
        const arr = JSON.parse(json)
        this.tarefas = (Array.isArray(arr)) ? arr : []

        this.updateProgress()
    },
    data() {
        return {
            tarefas: [{id: 1,descricao: 'teste', concluida: false}]
        }
    },
    watch: {
		tarefas: {
            // deep - Monitora o estado de cada um dos elementos, não apenas a quantia de elementos 
            deep: true,
            handler() {
                this.saveTasks()
            }
        }
	},
    methods: {
        removeById(id) {
            var result = this.tarefas.filter(function(el) {
                return el.id == id;
            });
                
            for(var elemento of result){
                var index = this.tarefas.indexOf(elemento);    
                this.tarefas.splice(index, 1);
            }

            this.updateProgress()
        },
        insertTask(descricao) {
            let lastItem = this.tarefas[this.tarefas.length - 1]
            let lastId = lastItem ? lastItem.id : 1
            let hasTask = (this.tarefas.filter(task => {
                return task.descricao === descricao
            })).length > 0;

            if (!hasTask) {
                this.tarefas.push({id: lastId+1, descricao: descricao, concluida: false})
                this.updateProgress()
            }
        },
        updateState(id) {
            let task = (this.tarefas.filter(task => {
                return task.id === id
            }))[0];

            if (task){
                task.concluida = !task.concluida
            }

                this.updateProgress()
        },
        updateProgress() {
            let doneCount = this.tarefas.filter(t => {
                return t.concluida == true
            }).length
            let totalCount = this.tarefas.length;
            let progress = Math.floor((doneCount / totalCount ) * 100)
            progress = isFinite(progress) ? progress : 0
            barramento.updateProgress(progress)
        },
        saveTasks() {
            localStorage.setItem('tarefas', JSON.stringify(this.tarefas))
        }
    }
}
</script>

<style scoped>
    .task-list {
        display: flex;
        flex-direction: row;
        max-width: 95vw;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        
    }

</style>