const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    surname: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date().toLocaleDateString(),
    },
})

const User = model('User', userSchema);
module.exports = User;