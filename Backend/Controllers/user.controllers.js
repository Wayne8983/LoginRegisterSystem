const Users = require("../Models/user.models");

const updateUser = async(req,res)=>{
    const token = req.cookies?.refreshToken;
    if(!token){
        return res.status(401).json({
            success:false,
            error:"Token not provided"
        });
    }
    try {
        const updates = req.body;
        const user = await Users.findOneAndUpdate({refreshToken:token},updates,{new:true});
        if(!user){
            return res.status(404).json({
                success:false,
                error:"User not found"
            })
        }
        return res.status(202).json({
            success:true,
            messsage:"Profile updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}


module.exports = updateUser;