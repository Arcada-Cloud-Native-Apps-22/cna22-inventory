require('dotenv').config()

module.exports = (req, res, next) => {

    try {
        const authHeader = req.headers['authorization']
        const key = authHeader.split(' ')[1]

        if (key != process.env.API_KEY_PRICING || key != process.env.API_KEY_PRODUCTS || key != process.env.API_KEY_ORDER) {
            throw new Error('Invalid Authorization key');
        }

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