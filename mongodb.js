// CRUD - Create, Read, Update, Delete
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// Destructured Shorthand
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
    connectionURL,
    {
        useNewUrlParser: true,
    },
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!');
        }

        const db = client.db(databaseName);

        // db.collection('users').findOne({ name: 'Kim' }, (error, user) => {
        //     if (error) {
        //         return console.log('Unable to fetch user');
        //     }

        //     console.log(user);
        // });

        // db.collection('users')
        //     .find({ age: 33 })
        //     .toArray((error, users) => {
        //         console.log(users);
        //     });

        // db.collection('users')
        //     .find({ age: 33 })
        //     .count((error, count) => {
        //         console.log(count);
        //     });

        db.collection('tasks').findOne({ _id: new ObjectID('625ef1fac192ce2ae0de7530') }, (error, task) => {
            if (error) {
                return console.log('Unable to fetch task!');
            }
            console.log(task);
        });

        db.collection('tasks')
            .find({ completed: false })
            .toArray((error, tasks) => {
                if (error) {
                    return console.log('Unable to find task');
                }
                console.log(tasks);
            });
    }
);
