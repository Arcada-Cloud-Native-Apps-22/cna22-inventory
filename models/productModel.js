/*
{
    "product": "KarhuIV",
    "warehouses":
            [{
                "name":"Göteborg",
                "amount": 50,
                "updatedAt": "10.10.2010"
            },
            {
                "name": "Helsingfors",
                "amount": 40,
                "updatedAt": "2848"
            },
            {
                "name": "Vasa",
                "amount": 24,
                "updatedAt": "24267"
            }],
            "createdAt": "242322"
    }
*/

const warehouseSchema = new mongoose.Schema({
    name: {
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
    warehouses: [warehouseSchema]
}, { timestamps: true });


module.exports = mongoose.model('Inventory', inventorySchema)