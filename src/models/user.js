const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs/dist/bcrypt');

const userSchema = new mongoose.Schema({
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

// userSchema.statics.findByCredentials;

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    // we are using a standard function so this is scoped properly
    // equal to document being saved
    const user = this;

    // this will be true if creating a user for the first time or if password is one of the updated properties
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    // tell the function is done executing
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
