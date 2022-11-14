const ProductAutoFill = require('../models/productModel')

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = async(input) => {

    try {
        const productEntry = new ProductAutoFill({
            _id: input,
            warehouses: [{
                    name: "Helsingfors",
                    amount: getRandomNumber(5, 200)
                },
                {
                    name: "Göteborg",
                    amount: getRandomNumber(5, 200)
                },
                {
                    name: "Vasa",
                    amount: getRandomNumber(5, 200)
                }
            ],
            updatedBy: "AutoGEN"
        })


        const newProduct = await productEntry.save()

        console.log("New Autofill Product has been created ", newProduct)
    } catch (error) {
        console.log(error.message)
    }

}