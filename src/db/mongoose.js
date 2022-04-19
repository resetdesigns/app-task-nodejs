const mongoose = require('mongoose');
const validator = require('validator');
// uses the mongo db module behind the scenes

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
    },
});

// const me = new User({ name: '     Joseph', email: 'test@TEST.com', password: 'abc123' });

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
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const task = new Task({ description: 'Test that spaces are trimmed from new tasks' });

task.save()
    .then(() => {
        console.log(task);
    })
    .catch((error) => {
        console.log('Error', error);
    });
