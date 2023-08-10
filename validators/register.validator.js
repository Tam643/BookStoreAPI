const Joi = require('joi');
module.exports = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().required(),
    confirmpassword: Joi.ref('password'),
});
