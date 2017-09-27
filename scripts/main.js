{
    'use strict';

    let vm = new Vue(
        {
            el: 'main#app',

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