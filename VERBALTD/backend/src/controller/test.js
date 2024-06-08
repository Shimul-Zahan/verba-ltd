const Test = require("../models/testModel");

const createTestQuestion = async (req, res) => {
    try {
        const { image, question, options, answer } = req.body;

        if (!question || !options || !answer) {
            return res.status(400).json({ message: 'Question, options, and answer are required.' });
        }

        if (!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: 'Options must be an array with at least two items.' });
        }

        const newQuiz = new Test({
            image,
            question,
            options,
            answer
        });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz question created successfully!', quiz: newQuiz });

    } catch (err) {

        console.error('Error creating quiz question:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

const getTestQuestions = async (req, res) => {
    try {
        const data = await Test.find();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createTestQuestion, getTestQuestions };
