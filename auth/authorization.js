require('dotenv').config()
const record = require('../middleware/recordWriter')

module.exports = (req, res, next) => {

    try {
        const authHeader = req.headers['authorization']
        const key = authHeader.split(' ')[1]

        if (key == process.env.API_KEY_PRICING) {
            req.authUser = "Pricing"
            console.log('Found match')
        } else if (key == process.env.API_KEY_PRODUCTS) {
            req.authUser = "Products"
            console.log('Found match')
        } else if (key == process.env.API_KEY_ORDER) {
            req.authUser = "Order"
            console.log('Found match')
        } else if (key == process.env.API_TEST) {
            req.authUser = "Admin"
            console.log('Found match')

        } else {
            throw new Error('Invalid Authorization key');
        }

        record(req)

        console.log('Token authorized')
    } catch (error) {
        console.log(error.message)
        return res.status(401).send({
            msg: "Authorization invalid",
            error: error.message
        })
    }
    next()
}