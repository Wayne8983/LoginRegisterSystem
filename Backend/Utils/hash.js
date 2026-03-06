const bcrypt = require("bcrypt");

const hashPassword = async(password)=>{
    return bcrypt.hash(password,10)
};

const Confirm = async(password,hash)=>{
    return bcrypt.compare(password,hash);
}


module.exports= {hashPassword,Confirm};
