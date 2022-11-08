module.exports = (req, res, next) => {
    try {
        //const warehouse = req.body['warehouse']
        //in progress, need to fix products POST structure so I got corret check structure
        
    } catch (error) {
        return res.status(404).send({
            msg: "No such warehouse found",
            error: error.message
        })
    }
}