/**
 * This file contains the routing path for the quiz app. In order to use these APIs the user must be logged in.
 * 
 * /createquiz: Create a new quiz.
 * /viewresult: View all the attempted quizes.
 * /viewquizes: View all the available quizes.
 * /attempt/:quiz: Attempt available quizes. ":quiz" should be replaced with appropriate quiz id while making a request.
 * /:quiz: View and also update the quiz. Users can view all the quizes irrespective of whoever has created but are 
 *         allowed to edit only those quizes that they have created.
**/

const router = require("express").Router();

const quizController = require('../controllers/quiz');

router.post("/createquiz", quizController.createQuiz);
router.get("/viewresult", quizController.viewResult);
router.get("/viewquizes", quizController.viewAllQuizes);
router.post("/attempt/:quiz", quizController.attemptQuiz);
router.get("/:quiz", quizController.viewQuiz);
router.put("/:quiz", quizController.updateQuiz);


module.exports = router;