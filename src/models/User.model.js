const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User =  new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    }
});
const UserModel = mongoose.model('User', User);
module.exports = UserModel;