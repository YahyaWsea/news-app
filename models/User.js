const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullname: { type: String, required: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    subscribtions: []
})

const User = mongoose.model('User', schema);
module.exports = User;