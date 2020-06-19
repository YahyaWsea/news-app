const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { LoginSchema, RegisterSchema } = require('../schemas/AuthSchema');

const generateToken = (id, email) => {
    return jwt.sign({
        _id: id,
        email: email
    }, config.get('jwtSecret'), {
        expiresIn: "6h"
    });
}

router.post('/login', (req, res) => {
    const { email, password } = req.body;



    // validation

    const { value, error } = LoginSchema.validate({ email, password });
    if (error) {
        return res.status(401).json({
            message: error.message
        })
    }

    // check user existence
    User.findOne({ email: email }).exec()
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (success) {
                        const token = generateToken(user._id, user.email || null);
                        return res.status(200).json({
                            status: "success",
                            type: "login",
                            message: `User ${user.email} logged in successfuly`,
                            token: token
                        });
                    } else {
                        console.log("Eror in hashing compare: ", err);
                        return res.status(401).json({
                            msg: "Wrong Password"
                        })
                    }
                });

            } else {
                console.log("User not found");
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                status: "error",
                type: "login",
                message: err
            })
        })
});

router.post('/register', (req, res) => {
    const { fullname, email, password, confirm_password } = req.body;

    // validation 
    const { value, error } = RegisterSchema.validate({ fullname, email, password, confirm_password });
    if (error) {
        return res.status(401).json({
            message: error.message
        })
    }

    // hashing password and saving user
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log("Error: ", err.message);
            return res.status(500).json({
                status: "error",
                type: "hash",
                message: err.message
            });
        }
        else {
            const user = new User({
                fullname: fullname,
                email: email,
                password: hash,
                subscribtions: []
            });
            user.save()
                .then(user => {
                    const token = generateToken(user._id, user.email || null);
                    return res.status(201).json({
                        status: "success",
                        type: "register",
                        message: `User ${user.email} created successfuly`,
                        token: token
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        status: "error",
                        type: "register",
                        message: err
                    })
                })
        }
    })

});



module.exports = router