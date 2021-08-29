import Vue from 'vue'
export default new Vue({
    methods: {
        taskStateChange(task) {
            this.$emit('taskStateChanged', task)
        },
        taskStateChanged(callback) {
            this.$on('taskStateChanged', callback)
        },
        deleteTask(task) {
            this.$emit('taskDeleted', task)
        },
        onTaskDelete(callback) {
            this.$on('taskDeleted', callback)
        },
        createTask(task) {
            this.$emit('taskCreated', task)
        },
        onTaskCreate(callback) {
            this.$on('taskCreated', callback)
        },
        updateProgress(progress) {
            this.$emit('progressUpdate', progress)
        },
        onProgressUpdated(callback) {
            this.$on('progressUpdate', callback)
        },
    }

})