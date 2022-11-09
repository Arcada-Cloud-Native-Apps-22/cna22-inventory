const Warehouse = require('../models/warehouseModel')

module.exports = async (req, res, next) => {

    try {
        //pulls info from body.warehouses
        const warehouses = req.body.warehouses

        //check if warehouses are even included in body
        if(warehouses) {
            console.log("warehouses are in body")
            //loop through warehouses
            for (let i = 0; i < warehouses.length; i++) {
                console.log(warehouses[i])
                const warehouse = await Warehouse.find({ name: warehouses[i].name })
                if (warehouse.length) {
                    //found warehouse with matching name
                    //console.log("found warehouse: " + warehouses[i].name + " under: " + warehouse)
                } else {
                    //no warehouse matching name
                    //console.log("bogus warehouse detected!: " + warehouses[i])
                    //console.log("aborting...")
                    return res.status(404).send({ msg: "Warehouse not found: " + warehouses[i].name })
                }
            }
        } else {
            console.log("No warehouses found in body (from warehouseCheck.js)")
            //No warehouses were provided in the request body.

            //currently set to abort. comment out line below if stated otherwise
            return res.status(500).send({msg: "No warehouses[] data provided in request. Entering atleast one warehouse with stock is currently required! (from inventory warehouseCheck)"})
        }
    
    } catch (error) {
        return res.status(500).send({msg: error.message})
    }

    next()
}