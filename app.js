/**
 * This is the entry point of the application where all the configuration realted to the application is done.
 * express: For creating the server and also for creating routing.
 * mongoose: To easily interact with mongodb.
 * dotenv: To load the environment variables.
**/

const path = require('path');

const express = require('express');
const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("Connected to db")
);

const errorController = require('./controllers/error');

const app = express();

const authRoutes = require('./routes/auth');
const tokenVerify = require('./routes/tokenVerify');
const quizRoutes = require('./routes/quiz');

app.use(express.json());

app.use('/user', authRoutes);
app.use('/quiz', tokenVerify, quizRoutes);

app.use(errorController.get404);

app.listen(port);
