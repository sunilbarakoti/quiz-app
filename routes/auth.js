/** 
 * This file contains the routing for the signup page.
 * /signup: To create an account.
 * /login: To login into existing account.
**/
const router = require("express").Router();

const authController = require('../controllers/auth');

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;