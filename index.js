//  express server creation

//  import aakunnathann use akkannn ahnn require
// import router.js
const router = require('./Routes/router')



// 1)import dotenv

require('dotenv').config()

// 2) import express
 const express = require('express')
 // import connections
require('./DB/connections')

//  3) import cors

const cors = require('cors')

//  4)create server
const pfServer = express();

// 5)apply corse to the create server
pfServer.use(cors())

// use a middleware called express.json() to convert json data to javscript object
pfServer.use(express.json())
pfServer.use(router)

// define port number
const PORT = 4000 || process.env.PORT

// run the server
pfServer.listen(PORT,()=>{
    console.log(`server is UP and running in PORT ${PORT}`);
})

// create a method
pfServer.get('/',(req,res)=>{
    res.send("project is running on port 4000")
})
