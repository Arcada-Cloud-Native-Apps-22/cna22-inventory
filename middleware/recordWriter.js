const LogEntry = require('../models/logModel')


module.exports = async(req) => {

    const logEntry = new LogEntry({
        targetMethod: req.method,
        targetDB: JSON.stringify(req.header),
        targetBody: JSON.stringify(req.body),
        accessKey: req.authUser
    })

    const newLog = await logEntry.save()
    console.log("New log saved ", newLog)

}