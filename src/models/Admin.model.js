const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Admin = new Schema({
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
    role: {
        type: String,
        required: true,
        trim: true
    }
});
const AdminModel = mongoose.model('Admin', Admin);
module.exports = AdminModel;