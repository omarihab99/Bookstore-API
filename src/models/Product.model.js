const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    sold: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    }
});
const ProductModel = mongoose.model('Product', Product);
module.exports = ProductModel;