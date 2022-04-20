require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('625f39d498a63ce5918e2f10', { age: 1 })
    .then((user) => {
        console.log(user);
        return User.countDocuments({ age: 1 });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
