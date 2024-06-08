const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
