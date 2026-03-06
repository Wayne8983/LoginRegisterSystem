const Users = require("../Models/user.models");
const {hashPassword,Confirm} = require("../Utils/hash");
const {generateAccessToken,generateRefreshToken} = require("../Utils/session");
const userSchema = require("../Utils/validate");
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const {error} = userSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                error:error.details[0].message
            });
        };

        const user = await Users.findOne({email});
        if(user){
            return res.status(409).json({
                success:false,
                error:"User already exists"
            });
        }

        // hashing the password
        const hash = await hashPassword(password);


        //Save user in database
        await Users.create({
            name,
            email,
            password:hash,
            role:"Admin"
        });
        return res.status(201).json({
            success:true,
            message:"User registered succesfully"
        })

    }catch(err){
        return res.json({
            success:false,
            error:err.message
        });
    }
   

}
const login = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password ){
        return res.status(400).json({
            success:false,
            error:"All fields are required"
        });
    }
    const user = await Users.findOne({email});
    if(!user){
        return res.status(404).json({
            success:false,
            error:"Invalid credentials"
        });
    }

    const ismatch = await Confirm(password,user.password);
    if(!ismatch){
        return res.status(400).json({
            success:false,
            error:"Invalid credentials"
        });
    }


    //generate accessToken
    const accessToken = await generateAccessToken(user);
    const refreshToken = generateRefreshToken(user)


    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:3*24*60*60*1000
    }); 

    user.refreshToken = refreshToken;
    await user.save();


    return res.status(202).json({
        success:true,
        accessToken,
        refreshToken,
        message:"Login successful"
    });

}

const generateNewAccessToken =async (req,res) => {
    const token = req.cookies?.refreshToken;
    if(!token) return res.status(401).json({message:"Unauthorised"});
    
    try {
        const decoded = jwt.verify(token,process.env.REFRESH_TOKEN);
        const user = await Users.findById(decoded.id);
        if(!user || user.refreshToken !== token) return res.sendStatus(403);

        const newAccessToken = await generateAccessToken(user);
        res.status(200).json({ newAccessToken });
    } catch (err){
        res.status(500).json({Error:err.message});
    }

}

const logout = async (req,res) => {
    const token = req.cookies?.refreshToken;
    if(token) {
        try {
        const user = await Users.findOne({refreshToken:token});
        if(user) {
            user.refreshToken = null;
           await user.save();
            
        }
        res.clearCookie("refreshToken")
        res.send("Logged out successfully");
      } catch (err) {
        res.sendStatus(500)
      }
    } 
}

module.exports = {register,login,generateNewAccessToken,logout};