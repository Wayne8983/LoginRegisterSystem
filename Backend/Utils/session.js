const jwt = require("jsonwebtoken");

const generateAccessToken = async(user)=>{
    return jwt.sign(
        {id:user._id,email:user.email,role:user.role},
        process.env.accessToken,
        {expiresIn:"1m"}
    );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        {id:user._id,
        email:user.email,
        role:user.role
        },
        process.env.REFRESH_TOKEN,
        {expiresIn:"3d"}
);
}

module.exports = {generateAccessToken,generateRefreshToken};