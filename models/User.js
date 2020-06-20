const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../helper_functions/ErrorHandler');

const schema = new mongoose.Schema({
    fullname: { type: String, required: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    subscribtions: []
})

schema.pre('save', function (next) {
    if (this.password || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                next(new ErrorHandler(401, "hashing error"));
            } else {
                this.password = hash;
                next();
            }
        });
    }
});

schema.statics.loginUser = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;
    const success = await bcrypt.compare(password, user.password);
    return success ? user : null;
};

const User = mongoose.model('User', schema);
module.exports = User;