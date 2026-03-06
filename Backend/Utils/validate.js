const joi = require("joi");

const userSchema = joi.object({
    name:joi.string().min(4).max(100).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[A-Za-z0-9]{3,30}$')).required()
});


module.exports = userSchema;