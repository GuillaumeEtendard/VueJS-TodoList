{
    'use strict';

    let vm = new Vue(
        {
            el: 'main#app',

            data: {
                tasks: [
                    { title: "Voir", isDone: true},
                    { title: "Manger", isDone: false},
                    { title: "Dormir", isDone: false},
                ]
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
        }
    )
}