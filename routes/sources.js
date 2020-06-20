const express = require('express');
const config = require('config');
const NewsAPI = require('newsapi');
const User = require('../models/User');
const { asyncTryCatch } = require('../middleware/asyncTryCatch');
const { ErrorHandler } = require('../helper_functions/ErrorHandler');

const router = express.Router();
const APIkey = config.get('APIkey');
const newsapi = new NewsAPI(APIkey);




// @route   GET /
// @desc     get all Sources for user
// @access  Private - user
router.get("/", asyncTryCatch(async (req, res) => {
    try {
        const response = await newsapi.v2.sources();
        res.status(200).send(response);
    } catch (error) {
        throw new ErrorHandler(500, "Connection failed");
    }
}));

// @route   GET /filtered
// @desc     get filtered Sources for user
// @access  Private - user
router.get("/filtered", asyncTryCatch(async (req, res) => {
    try {
        const { category, language } = req.query;
        const response = await newsapi.v2.sources({
            category,
            language,
        })
        res.status(200).send(response);
    } catch (error) {
        throw new ErrorHandler(500, "Connection failed");
    }
}));


// @route   GET /subscribed
// @desc     get user subscribed Sources
// @access  Private - user
router.get("/subscribed", asyncTryCatch(async (req, res) => {
    try {
        const { subscribtions } = await User.findById(req.currentUser._id);
        res.status(200).send(subscribtions);
    } catch (error) {
        throw new ErrorHandler(500, "Connection failed")
    }
}));


module.exports = router;