require('../src/db/mongoose');
const Task = require('../src/models/task');

// Promise Chaining
// Task.findByIdAndDelete('625f3c456e3b14bc534837b9')
//     .then(() => {
//         console.log('Task removed');
//         return Task.countDocuments({ completed: false });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// Async Await
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
};

deleteTaskAndCount('6260311ca47a297d8415fbfc')
    .then((count) => {
        console.log(count);
    })
    .catch((error) => {
        console.log(error);
    });
