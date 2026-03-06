const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        Enumerator:["Admin","User"],
        type:String,
        required:true
    },
    refreshToken:{
        type:String
        
    }
},
{
    timestamps:{
        createdAt:true,
        updatedAt:false
    }
})


module.exports = mongoose.model("Users",userSchema)