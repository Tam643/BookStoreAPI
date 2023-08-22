const Joi = require('joi');
module.exports = Joi.object({
    address: {
        recipientname: Joi.string().trim().lowercase(),
        houseNumber: Joi.string().trim(),
        village: Joi.string().trim().lowercase(),
        lane: Joi.string().trim().lowercase(),
        road: Joi.string().trim().lowercase(),
        subdistrict: Joi.string().trim().lowercase(),
        district: Joi.string().trim().lowercase(),
        province: Joi.string().trim().lowercase(),
        postalCode: Joi.string().trim(),
    },
    role: Joi.string().valid('employee', 'customer', 'manager'),
    password: Joi.string().min(8)
});
