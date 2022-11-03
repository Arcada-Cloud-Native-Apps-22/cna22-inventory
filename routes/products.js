const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const { updateOne } = require('../models/productModel')


// GET all warehouses

router.get('/', async(req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// POST a new warehouse
router.post('/', async(req, res) => {
    try {
        const product = new Product({
            product: req.body.product
        })

        const newProduct = await product.save()
        res.send({ msg: "Warehouse has been saved ", newProduct })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

module.exports = router