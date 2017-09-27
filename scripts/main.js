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
            }
        }
    )
}