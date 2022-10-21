const express = require('express')
const router = express.Router()

const Warehouse = require('../models/warehouseModel')

// GET all warehouses


// POST a new warehouse
router.post('/', async (req, res) => {
    try {
        const warehouse = new Warehouse({
            city: req.body.city,
            address: req.body.address
        })

        const newWarehouse = await warehouse.save()
        res.send({ msg: "Warehouse has been saved ", newWarehouse })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// PUT

// PATCH

// DELETE

