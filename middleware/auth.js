const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../helper_functions/token');
const { LoginSchema, RegisterSchema } = require('../schemas/AuthSchema');
const { asyncTryCatch } = require('./asyncTryCatch');
const { ErrorHandler } = require('../helper_functions/ErrorHandler');
const config = require('config');



// Verify that user is logged in middleware
const auth = asyncTryCatch((req, res, next) => {
    const token = req.headers.authorization;
    currentUser = token ? verifyToken(token.split(" ")[1]) : false;
    if (currentUser) {
        req.currentUser = currentUser;
        next();
    }
    else {
        next(new ErrorHandler(401, " Authentication failed "));
    }
})


const validateRegister = asyncTryCatch((req, res, next) => {
    const { fullname, email, password, confirm_password } = req.body;
    const { value, error } = RegisterSchema.validate({ fullname, email, password, confirm_password });
    if (error) {
        throw new ErrorHandler(401, error.message);
    } else {
        next();
    }
});

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const { value, error } = LoginSchema.validate({ email, password });
    if (error) {
        throw new ErrorHandler(401, error.message);
    } else {
        next();
    }

}






module.exports = { auth, validateRegister, validateLogin }