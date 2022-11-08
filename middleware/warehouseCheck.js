const Warehouse = require('../models/warehouseModel')

module.exports = async (req, res, next) => {

    try {
        const warehouses = req.body.warehouses
        //loop through
        for (let i = 0; i < warehouses.length; i++){
            console.log(warehouses[i])
            const warehouse = await Warehouse.find({name: warehouses[i].name})
            if(warehouse.length){
                console.log("found warehouse: " + warehouses[i].name + " under: " + warehouse)
            } else{
                console.log("bogus warehouse detected!: " + warehouses[i])
                console.log("aborting...")
                return res.status(404).send({msg: "Warehouse not found: " + warehouses[i].name})
            }
        }
        //const warehouse = req.body['warehouse']
        //in progress, need to fix products POST structure so I got corret check structure
        
    } catch (error) {
        return res.status(500).send({msg: error.message})
    }

    next()
}