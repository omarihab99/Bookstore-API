const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    numberOfProducts: {
        type: Number,
        required: true,
        trim: true
    }
});

const CategoryModel = mongoose.model('Category', Category);
module.exports = CategoryModel;