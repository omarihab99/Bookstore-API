const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema({
    createdAt: {
        type: Date,
        required: true,
    },
    products:[
        {
            product: {
                type: Schema.Types.ObjectId, ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }
});
const OrderModel = mongoose.model('Order', Order);
module.exports = OrderModel;