const { Schema, model } = require('mongoose');

const userAccountSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date().toLocaleDateString(),
    },
})

const UserAccountSchema = model('Employes', userAccountSchema);
module.exports = UserAccountSchema;