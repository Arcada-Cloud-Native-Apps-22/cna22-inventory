const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3123

console.log("Go to /public for instructions")

// statisk sida med instruktioner
app.use('/', express.static(__dirname + '/public'))
/*app.get('/', (req, res) => {
    res.send({msg:`Express svarar!`})
})*/

// mongoose-connection till databasen
/*
mongoose.connect("<some URL>")
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.on('open', () => console.log("Connected to Database"))
*/

app.listen(PORT, () => {
    //callback så att vi vet att appen startat
    console.log(`Server listening on port: ${PORT}`)
})
