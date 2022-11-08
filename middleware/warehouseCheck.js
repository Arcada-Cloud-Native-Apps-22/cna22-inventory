const Warehouse = require('../models/warehouseModel')

module.exports = async (req, res, next) => {

    try {
        //pulls info from body.warehouses
        const warehouses = req.body.warehouses
        //loop through warehouses
        for (let i = 0; i < warehouses.length; i++){
            console.log(warehouses[i])
            const warehouse = await Warehouse.find({name: warehouses[i].name})
            if(warehouse.length){
                //found warehouse with matching name
                console.log("found warehouse: " + warehouses[i].name + " under: " + warehouse)
            } else{
                //no warehouse matching name
                console.log("bogus warehouse detected!: " + warehouses[i])
                console.log("aborting...")
                return res.status(404).send({msg: "Warehouse not found: " + warehouses[i].name})
            }
        }
    
    } catch (error) {
        return res.status(500).send({msg: error.message})
    }

    next()
}