const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT || 3123
app.use(express.json())

// mongoose-connection till databasen
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.on('open', () => console.log("Connected to database"))

console.log(process.env.DOTENV_TEST)
console.log("Go to /public for instructions")

// statisk sida med instruktioner
app.use('/', express.static(__dirname + '/public'))


// warehouses endpoint
const warehouseRouter = require('./routes/warehouses')
app.use('/warehouses', warehouseRouter)

app.listen(PORT, () => {
    //callback så att vi vet att appen startat
    console.log(`Server listening on port: ${PORT}`)
})
