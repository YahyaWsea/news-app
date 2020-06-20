const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const { asyncTryCatch } = require('../middleware/asyncTryCatch');
const { ErrorHandler } = require('../helper_functions/ErrorHandler');



// @route   PATCH /subscribe/:id
// @desc    Subscribe a Source for user
// @access  Private - user
router.patch('/subscribe/:id', asyncTryCatch(async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    try {
        const user = await User.findById(req.currentUser._id);
        if (action === "subscribe") {
            user.subscribtions.push(id);
        } else if (action === "unsubscribe") {
            user.subscribtions.pull(id);
        }
        await user.save();
        res.status(200).send(user.subscribtions);
    } catch (error) {
        throw new ErrorHandler(500, " Subscribtion internal server error ");
    }


}));



module.exports = router