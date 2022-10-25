const express = require('express')
const router = express.Router()
const Warehouse = require('../models/warehouseModel')
const { updateOne } = require('../models/warehouseModel')


// GET all warehouses

router.get('/', async (req, res) => {
    try {
        const warehouses = await Warehouse.find()
        res.send(warehouses)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// POST a new warehouse
router.post('/', authToken, async (req, res) => {
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

router.patch('/:id', authToken, async (req,res) =>{
    try {
        const updateWH = await Warehouse.findByIdAndUpdate(
            {_id: req.params.id, createdBy: req.authUser.sub}, // Kanske måste ändra på createdBy
            req.body, // Updateringen som skall ske
            {new: true})
        res.send({msg: "Warehouse has been updated", updateWH: updateOne})
    } catch (error) {
        res.status(500).send({msg: error.message})
    }
})


// DELETE

router.delete('/:id', authToken, async (req,res) => {
    try {
        const deleteWarehouse = await Cabin.deleteOne({
            _id: req.params.id,
            createdBy: req.authUser.sub })
        if(!deleteWarehouse){
            return res.status(404).send({msg: "No such warehouse"})
        }
        res.send(deleteWarehouse)
    } catch (error) {
        res.status(500).send({msg: error.message})
    }
})


module.exports = router