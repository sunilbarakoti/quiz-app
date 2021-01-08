/**
 * Schema for user authentication.
 *
**/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    lname: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    username: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);