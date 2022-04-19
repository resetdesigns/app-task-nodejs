const mongoose = require('mongoose');
// uses the mongo db module behind the scenes

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
});

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//     },
//     age: {
//         type: Number,
//     },
// });

// const me = new User({ name: 'Joseph', age: 34 });

// me.save()
//     .then(() => {
//         console.log(me);
//     })
//     .catch((error) => {
//         console.log('Error', error);
//     });

const Task = mongoose.model('Task', {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});

const task = new Task({ description: 'Test mongoose models', completed: false });

task.save()
    .then(() => {
        console.log(task);
    })
    .catch((error) => {
        console.log('Error', error);
    });
