/*
namn,
{
    warehouse
    amount
},
{
    warehouse
    amount
},
{
    warehouse
    amount
}
*/

const warehouseSchema = new mongoose.Schema({
    warehouse: {
        type: String,
        required: true
    },
    amount: {
        type: Int32,
        required: true
    }
}, { timestamps: true });

const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    wareHouse: [warehouseSchema]
}, { timestamps: true });





module.exports = mongoose.model('Inventory', inventorySchema)