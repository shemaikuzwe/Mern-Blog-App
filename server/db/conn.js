const mongoose = require('mongoose');
require("dotenv").config()


const  conn=mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("connected"))
    .catch((e)=>console.log("error",e))

module.exports=conn;