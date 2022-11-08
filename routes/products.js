const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const { updateOne } = require('../models/productModel')
const warehouseCheck = require('../middleware/warehouseCheck')

// GET all products

router.get('/', async(req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// POST a new product
router.post('/', warehouseCheck, async(req, res) => {
    try {
        const product = new Product({
            product: req.body.product,
            warehouses: req.body.warehouses
        })

        const newProduct = await product.save()
        res.send({ msg: "Product has been saved ", newProduct })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// PUT CHANGE AMOUNT
router.put('/:id', async(req, res) => {
    try {
        const subtractAmount = await Product({
            product: req.body.product
        })

        const newProduct = await product.save()
        res.send({ msg: "Product has been saved ", newProduct })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

module.exports = router