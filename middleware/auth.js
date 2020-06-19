const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// helper function
const isLogged = (token) => {
    try {
        const payload = jwt.verify(token, config.get('jwtSecret'));
        return payload;
    } catch (error) {
        return false;
    }
};

// Verify that user is logged in middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    currentUser = token ? isLogged(token.split(" ")[1]) : false;
    if (currentUser) {
        console.log(currentUser);
        req.currentUser = currentUser;
        next();
    }
    else return res.status(401).json({
        status: "error",
        type: "auth",
        message: "Authentication failed"
    });
}


module.exports = { auth }