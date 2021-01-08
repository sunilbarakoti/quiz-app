/**
 * Schema for quiz app. I have used mongoose ODM.
 * 
**/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    // _id: false,
    question: {
        type: String,
        required: true
    },
    choices: [],
    answer: {
        type: String,
        required: true
    }
})

const quizSchema = new Schema({
    created_by: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    is_active: {
        type: Boolean,
        required: true,
    },
    questions: [questionSchema]

});


const answerSchema = new Schema({
    _id: false,
    question: {
        type: String,
        required: true
    },
    user_choice: {
        type: String,
    },
    correct_answer: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true
    }
})

const resultSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    quiz_id: {
        type: String,
        required: true,
    },
    completion_status: {
        type: String,
        required: true,
    },
    attempt_no: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    answers: [answerSchema],

});

module.exports = {
    Quiz: mongoose.model("Quiz", quizSchema),
    Results: mongoose.model("Results", resultSchema)
}
