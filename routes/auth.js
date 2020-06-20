const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { generateToken } = require('../helper_functions/token');
const { ErrorHandler } = require('../helper_functions/ErrorHandler');
const { validateRegister, validateLogin } = require('../middleware/auth');
const { asyncTryCatch } = require('../middleware/asyncTryCatch');
const { sanitizeLogin, sanitizeRegister } = require('../middleware/sanitizeInput');


// @route   POST /login
// @desc     login user
// @access  Public
router.post('/login', sanitizeLogin, validateLogin, asyncTryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.loginUser(email, password);
    if (!user) {
        throw new ErrorHandler(401, "These credentials are invalid ..");
    }
    const token = generateToken(user._id, user.email);
    if (!token) throw new ErrorHandler(500, " Error in generating token ");
    res.status(200).send({
        status: "success",
        type: "register",
        message: `User ${user.email} loggedin successfuly`,
        token: token
    })

}));


// @route   POST /register
// @desc     register user
// @access  Public
router.post('/register', sanitizeRegister, validateRegister, asyncTryCatch(async (req, res) => {
    const { fullname, email, password, confirm_password } = req.body;
    const user = new User({
        fullname,
        email,
        password,
        subscribtions: []
    });
    try {
        await user.save();
        const token = generateToken(user._id, user.email);
        if (!token) { throw new ErrorHandler(500, " Error in generating token ") };
        res.status(201).send({
            status: "success",
            type: "register",
            message: `User ${user.email} created successfuly`,
            token: token
        })
    } catch (error) {
        throw new ErrorHandler(401, "Duplication error");
    }
}));



module.exports = router