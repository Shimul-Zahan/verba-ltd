const { Schema, model } = require('mongoose');

const officeSchema = new Schema({
    image: { type: String, required: true },
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: { type: String, required: true },
    countryName: { type: String, required: true },
    timezone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    language: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

const OfficeSchema = model('UserProfile', officeSchema);

module.exports = OfficeSchema;
