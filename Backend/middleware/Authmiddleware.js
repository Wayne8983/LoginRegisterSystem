const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    try{
        const Bearer =req.headers?.authorization;
        if(!Bearer){
            res.sendStatus(401);
        }

        const token = Bearer.split(" ")[1];

        const decoded = jwt.verify(token,process.env.accessToken);
        req.user=decoded;
        next();



    }catch(err){
        res.json({error:err.message})
    }



}


module.exports = verifyToken;