const express = require('express');
const config = require('config');
const NewsAPI = require('newsapi');
const User = require('../models/User');
const { asyncTryCatch } = require('../middleware/asyncTryCatch');
const { ErrorHandler } = require('../helper_functions/ErrorHandler');

const APIkey = config.get('APIkey');
const router = express.Router();


const newsapi = new NewsAPI(APIkey);



// @route   Get /
// @desc    get news of subscribed sources for user
// @access  Private - user
router.get("/", asyncTryCatch(async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const { subscribtions } = await User.findById(req.currentUser._id);
        if (subscribtions.length) {
            const response = await newsapi.v2.everything({
                sources: subscribtions.join(","),
                page,
                pageSize
            });
            res.status(201).send(response);
        } else {
            return res.status(201).send({ message: "No subscribtions yet" });
        }
    } catch (error) {
        throw new ErrorHandler(500, " Internal server error ")
    }
}));

module.exports = router;