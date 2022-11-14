const ProductAutoFill = require('../models/productModel')

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = async(req) => {

    const productEntry = new ProductAutoFill({
        product: req.params.id,
        warehouses: [
            {
                name : "Helsingfors",
                amount : getRandomNumber(5, 200)
            },
            {
                name : "Göteborg",
                amount : getRandomNumber(5, 200)
            },
            {
                name : "Vasa",
                amount : getRandomNumber(5, 200)
            }
        ]
    })

    const newProduct = await productEntry.save()
    console.log("New log saved ", newProduct)

}