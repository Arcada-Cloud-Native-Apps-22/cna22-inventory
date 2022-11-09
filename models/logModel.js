const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    targetMethod: {
        type: String
    },
    targetDB: {
        type: String
    },
    targetBody: {
        type: String
    },
    accessKey: {
        type: String
    },

}, { timestamps: true })

module.exports = mongoose.model('AccessLog', logSchema)