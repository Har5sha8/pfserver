//  import mongoose

const mongoose = require('mongoose')

// get connection string from.env
const connectionString= process.env.DATA_BASE;

// connect to momgodb using mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connected successfully");
}).catch((err)=>{
    console.log(`momgoDB connection due to ${err}`);
})
