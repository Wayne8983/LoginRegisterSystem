const mongoose = require("mongoose");
const connectdb = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL)
        .then(console.log("Database connected Successfully✅✅"));

    }catch(err){
        console.log(err.message);
        process.exit(1);
    }

}
module.exports = connectdb;