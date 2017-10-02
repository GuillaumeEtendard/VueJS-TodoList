{
    'use strict';

    const Task = {
        props: ['task', 'index'],
        methods: {
            editTask: function (task) {
                this.$emit('edit-task', task);
            },

            deleteTask: function (task) {
                this.$emit('delete-task', task);
            }
        },
        template: `
            <li class="collection-item">
                <input type="checkbox" :id="'t_' + (index + 1)" :checked="task.isDone" v-on:click="editTask(task)">
                <label :for="'t_' + (index + 1)">{{ task.title }}</label>
                <a href="#" class="link-delete" title="Supprimer cette tâche" v-on:click="deleteTask(task)">
                    <i class="small material-icons">delete_forever</i>
                </a>
            </li>`
    };

    let vm = new Vue(
        {
            el: 'main#app',
            components: {'task': Task},

            data: {
                tasks: JSON.parse(localStorage.getItem('tasks')) || [],
                newTask: {}
            },

            filters: {
                pluralize: function (number, word) {
                    if (number > 1) word += 's';
                    return number + ' ' + word;
                }
            },

            computed: {
                remaining: {
                    cache: false,
                    get() {
                        if (!this.tasks) return;
                        return this.tasks.filter(task => !task.isDone).length
                    }
                },
            },

            methods: {
                addTask: function () {
                    this.newTask.isDone = false;
                    this.tasks.push(this.newTask);
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.newTask = {};
                    this.$forceUpdate();
                },

                editTask: function (task) {
                    const todoIndex = this.tasks.indexOf(task);
                    this.tasks[todoIndex].isDone = !this.tasks[todoIndex].isDone;
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.$forceUpdate();
                },

                deleteTask: function (task) {
                    const todoIndex = this.tasks.indexOf(task);
                    this.tasks.splice(todoIndex, 1);
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.$forceUpdate();
                }
            }
        }
    )
}