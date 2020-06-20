const jwt = require('jsonwebtoken');
const config = require('config');


const generateToken = (id, email) => {
    try {
        return jwt.sign({
            _id: id,
            email: email
        }, config.get('jwtSecret'), {
            expiresIn: "6h"
        });
    } catch (error) {
        return null;
    }
}

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, config.get('jwtSecret'));
        return payload;
    } catch (error) {
        return null;
    }
};

module.exports = { verifyToken, generateToken }