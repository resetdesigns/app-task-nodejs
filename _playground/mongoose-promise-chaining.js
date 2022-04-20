require('../src/db/mongoose');
const { update } = require('../src/models/user');
const User = require('../src/models/user');

// Promise Chaining
// User.findByIdAndUpdate('625f39d498a63ce5918e2f10', { age: 1 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 1 });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// Async Await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('625f39d498a63ce5918e2f10', 2)
    .then((count) => {
        console.log(count);
    })
    .catch((error) => {
        console.log(error);
    });
