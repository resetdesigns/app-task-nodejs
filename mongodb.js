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

        // db.collection('tasks')
        //     .updateMany(
        //         { completed: false },
        //         {
        //             $set: {
        //                 completed: true,
        //             },
        //         }
        //     )
        //     .then((result) => {
        //         console.log(result.modifiedCount);
        //     })
        //     .catch((error) => {
        //         console.log('Error:', error);
        //     });

        db.collection('users')
            .deleteMany({ age: 34 })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        db.collection('tasks')
            .deleteOne({ description: 'Validate tasks inserted into collection' })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);
