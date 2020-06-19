const express = require('express');
const router = express.Router();
const User = require('../models/User');
const config = require('config');
const APIkey = config.get('APIkey');


const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(APIkey);

router.get("/", async (req, res) => {
    const { subscribtions } = await User.findById(req.currentUser._id);
    if (subscribtions.length) {
        const response = await newsapi.v2.everything({
            sources: subscribtions.join(",")
        });
        res.status(201).send(response);
    } else {
        return res.status(201).send({ message: "No subscribtions yet" });
    }
});

module.exports = router;