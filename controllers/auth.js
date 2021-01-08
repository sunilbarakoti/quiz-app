/**
 * This page determines what response to send back to the user based on the user actions. 
 * This page contains the logics for the signup and login functionality of the application.
 * 
 * jwt: After a sucessful login the acess token is created in order to validate each APIs.
 * bcrypt: To hash the password before storing into the database.
 * signup(): It contains the logic for the user registration.
 * login(): It contains the logic for the user authentication.
**/

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/auth");

exports.signup = async (req, res, next) => {

    const usernameExist = await User.findOne({ username: req.body.username });

    if (usernameExist)
        return res.status(400).json({ error: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password,
    });

    try {
        const savedUser = await user.save();
        res.json({ error: null, data: { userId: savedUser._id } });
    } catch (error) {
        res.status(400).json({ error });
    }
};


exports.login = async (req, res) => {

    const user = await User.findOne({ username: req.body.username });

    if (!user)
        return res.status(400).json({ error: "Incorrect Username" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword)
        return res.status(400).json({ error: "Incorrect Password" });

    // creating jwt token
    const token = jwt.sign(
        {
            user: user.username,
            id: user._id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '3600s' }
    );

    res.header("auth-token", token).json({
        error: null,
        data: {
            token,
        },
    });
}
