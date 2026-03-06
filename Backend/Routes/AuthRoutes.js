const express = require("express");
const {register,login, generateNewAccessToken, logout} = require("../Controllers/AuthControllers");
const verifyToken = require("../middleware/Authmiddleware");
const authorizeRoles = require("../middleware/verifyrole");
const router = express.Router();



router.post('/register',register);
router.post('/login',login);
router.post('/refresh',generateNewAccessToken);
router.delete("/logout",logout)
router.get('/profile',verifyToken,(req,res)=>{
    res.status(200).json({
        user:req.user,
        message:`Welcome back!`
    })
})

router.get('/admin',verifyToken,authorizeRoles("Admin"),(req,res)=>{
    res.status(200).json({
        message:"Welcome admin"
    });
})






module.exports = router;