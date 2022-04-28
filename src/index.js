const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request are disabled');
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('The site is under maintenance. Please try back soon.');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById('6269b8dd2f6cd626d3f8a718');
//     // await task.populate('owner');
//     // console.log(task.owner);

//     const user = await User.findById('6269b8952f6cd626d3f8a710');
//     await user.populate('tasks');
//     console.log(user.tasks);
// };

// main();
