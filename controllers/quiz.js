/**
 * This page determines what response to send back to the user based on the user actions.
 * This page contains the logics for all the quiz realted functionalities of the application.
 *
 * createQuiz(): This allows sucessfully logged in user to create quiz.
 * updateQuiz(): This allows users to make any modifcations required in the quiz that they have created.
 * viewAllQuizes(): This allows users to view all the available quizes.
 * viewQuiz(): This allows user to view the particular quiz.
 * viewResult(): This allows each user to view their attempts and results.
 * attemptQuiz(): This allows users to take the quiz.
**/


const { Quiz, Results } = require("../models/quiz");

exports.createQuiz = async (req, res, next) => {

    if (req.body.questions.length < 1) {
        return res.status(400).json({ error: "There should be atleast one question to create quiz" });
    }

    const quiz = new Quiz({
        created_by: req.user.id,
        is_active: req.body.is_active,
        questions: req.body.questions,
    });

    try {
        const savedQuiz = await quiz.save();
        res.json({ error: null, data: { quizId: savedQuiz._id } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.updateQuiz = async (req, res, next) => {

    const user = await Quiz.findOne({ created_by: req.user.id, _id: req.params.quiz });

    if (!user)
        return res.status(400).json({ error: "Not permitted to modify" });


    if (req.body.questions.length < 1)
        return res.status(400).json({ error: "There should be atleast one question in order to create quiz" });


    try {
        const savedQuiz = await Quiz.findByIdAndUpdate(req.params.quiz, {
            $set: req.body
        }, { new: true })

        res.json({ error: null, data: { quizId: savedQuiz._id } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.viewAllQuizes = async (req, res, next) => {

    try {
        const user = await Quiz.find({});
        res.json({ error: null, data: user });
    } catch (error) {
        res.status(400).json({ error });
    }
};


exports.viewQuiz = async (req, res, next) => {

    try {
        const user = await Quiz.findOne({ _id: req.params.quiz });
        res.json({ error: null, data: user });
    } catch (error) {
        res.status(400).json({ error });
    }
};


exports.viewResult = async (req, res, next) => {

    try {
        const result = await Results.find({ user_id: req.user.id });
        res.json({ error: null, data: result });
    } catch (error) {
        res.status(400).json({ error });
    }
};


exports.attemptQuiz = async (req, res, next) => {

    const quiz_id = req.params.quiz;
    const quiz_ans = req.body;
    let attempt_no = 1;
    let score = 0;

    const result_exists = await Results.find({ quiz_id: quiz_id, user_id: req.user.id });

    if (result_exists)
        attempt_no = result_exists.length + 1;

    const find_quiz = await Quiz.findOne({ _id: quiz_id });
    if (!find_quiz)
        return res.status(400).json({ error: "Quiz doesn't exist" });

    const questions = find_quiz.questions

    const question_temp = {}
    questions.map(question => {
        question_temp[question._id] = question;
    })

    const answer_check = [];

    quiz_ans.map(ans => {
        const ques_ans = {}
        if (question_temp[ans.id]) {
            ques_ans["question"] = question_temp[ans.id].question;
            ques_ans["user_choice"] = ans.answer;
            ques_ans["correct_answer"] = question_temp[ans.id].answer;
            if (ans.answer === question_temp[ans.id].answer) {
                ques_ans["correct"] = true;
                score++;
            } else {
                ques_ans["correct"] = false;
            }
            answer_check.push(ques_ans)
        }

    })

    const completion_status = questions.length === quiz_ans.length ? "Complete" : "Incomplete";

    const quiz = new Results({
        user_id: req.user.id,
        quiz_id,
        completion_status: completion_status,
        answers: answer_check,
        score,
        attempt_no
    });

    try {
        const saveResult = await quiz.save();
        res.json({ error: null, data: { resultId: saveResult._id } });
    } catch (error) {
        res.status(400).json({ error });
    }
};