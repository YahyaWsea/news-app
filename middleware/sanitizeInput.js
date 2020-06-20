const { check, validationResult } = require("express-validator");
const { ErrorHandler } = require("../helper_functions/ErrorHandler");

const sanitizeLogin = [
    check("email").escape().trim(),
    check("password").escape().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(422, errors.array());
        }
        next();
    },
];

const sanitizeRegister = [
    check("fullName").escape().trim(),
    check("email").escape().trim(),
    check("password").escape().trim(),
    check("confirm_password").escape().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(422, errors.array());
        }
        next();
    },
];

module.exports = {
    sanitizeLogin,
    sanitizeRegister,
};