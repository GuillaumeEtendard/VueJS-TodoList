{
    'use strict';

    let vm = new Vue(
        {
            el: 'main#app',

            data: {
                tasks: JSON.parse(localStorage.getItem('tasks')) || [],
                task: {}
            },

            filters: {
                pluralize: function (number, word) {
                    if(number > 1) word += 's';
                    return number + ' ' + word;
                }
            },

            computed: {
                remaining: function () {
                    if(!this.tasks) return;
                    return this.tasks.filter(task => !task.isDone).length
                }
            },

            methods: {
                addTask: function(){
                    this.task.isDone = false;
                    this.tasks.push(this.task);
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.task = {};
                },

                editTask: function(task){
                    const todoIndex = this.tasks.indexOf(task);
                    this.tasks[todoIndex].done = true;
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                },

                deleteTask: function(index){
                    this.tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            }
        }
    )
}