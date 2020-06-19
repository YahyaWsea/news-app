const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');


// @route   PATCH /subscribe/:id
// @desc    Subscribe or unSubscribe a Source for user
// @access  Private - user
router.patch('/subscribe/:id', async (req, res) => {

    const { id } = req.params;
    const { action } = req.body;
    console.log(req.params);
    // console.log(action);
    const user = await User.findById(req.currentUser._id);
    if (action === "subscribe") {
        user.subscribtions.push(id);
    } else if (action === "unsubscribe") {
        user.subscribtions.pull(id);
    }
    user.save().then((user) => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send(err);
    })

})



module.exports = router