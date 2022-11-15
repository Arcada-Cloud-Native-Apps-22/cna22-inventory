const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const authToken = require('../auth/authorization')
const { updateOne } = require('../models/productModel')
const warehouseCheck = require('../middleware/warehouseCheck')
const autoFill = require('../middleware/autoFill')

// GET all products

router.get('/', authToken, async(req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// GET specific product

router.get('/:id', authToken, async(req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).send({ msg: "Note not found" })
        }
        res.send(product)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// POST a new product
router.post('/', authToken, async(req, res) => {
    if (req.body.warehouses == null) {
        try {
            autoFill(req.body.product)
            res.send({ msg: "Product has been saved with auto generated amounts" })
        } catch (error) {
            res.status(500).send({ msg: error.message })
            console.log("Failed BUT warehouses == null")
        }
    } else {
        try {
            console.log("Not supposed to be here without warehouse body")
            const product = new Product({
                _id: req.body.product,
                warehouses: req.body.warehouses,
                updatedBy: req.authUser
            })

            const newProduct = await product.save()
            res.send({ msg: "Product has been saved ", newProduct })


        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
})

// PATCH adjust amount
router.patch('/adjust/:id', authToken, async (req, res) => {
    try {
        let warehouseToPatch = null;
        //temporary monkeybrain code. This if else check assumes hfors->gborg->vasa order and is not viable!!
        //also its broken anyways atm
        if(req.body.warehouse == "Helsingfors"){
            warehouseToPatch = "warehouse.0.amount"
        }
        else if(req.body.warehouse == "Göteborg"){
            warehouseToPatch = "warehouse.1.amount"
        }
        else if(req.body.warehouse == "Vasa"){
            warehouseToPatch = "warehouse.2.amount"
        }
        else {
            return res.status(404).send({ msg: "No such warehouse exists" })
        }
        console.log(warehouseToPatch)

        //actual product update
        const updateProduct = await Product.findByIdAndUpdate({ _id: req.params.id },
            {
                //increment value by given amount (supports negative numbers)
                $inc: {
                    warehouseToPatch: req.body.amount
                }
            },
            { new: true })
        res.send({ msg: "Product has been saved ", updateProduct: updateOne })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// PATCH the whole object
router.patch('/:id', authToken, warehouseCheck, async(req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate({ _id: req.params.id },
            req.body, { new: true })
        res.send({ msg: "Product has been saved ", updateProduct: updateOne })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

module.exports = router

// DELTE CHANGE AMOUNT
router.delete('/:id', authToken, async(req, res) => {
    try {
        const deleteProduct = await Product.deleteOne({
            _id: req.params.id
        })
        if (!deleteProduct) {
            return res.status(404).send({ msg: "No such product" })
        }
        res.send(deleteProduct)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

module.exports = router