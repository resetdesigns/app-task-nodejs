require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('625f3c456e3b14bc534837b9')
    .then(() => {
        console.log('Task removed');
        return Task.countDocuments({ completed: false });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
