require("dotenv").config()
const mongoose = require("mongoose");
const adminSeeder = require("../adminSeeder");

exports.connectDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb sanaga connect vayo haii");
        adminSeeder();
        
    } catch (error) {
        console.error("Mongodb connection faild",error.message)
        process.exit(1);//stop app if database is down
    }
};


