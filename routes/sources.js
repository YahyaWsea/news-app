const express = require('express');
const router = express.Router();
const config = require('config');

const APIkey = config.get('APIkey');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(APIkey);

router.get("/", async (req, res) => {
    const response = await newsapi.v2.sources();
    res.json(response);
});

module.exports = router;