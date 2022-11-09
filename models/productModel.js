const mongoose = require('mongoose')

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    warehouses: [warehouseSchema]
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema)