const Joi = require('joi');
module.exports = Joi.object({
    address: Joi.object({
        recipientname: Joi.string().trim().lowercase(),
        houseNumber: Joi.string().trim(),
        village: Joi.string().trim().lowercase(),
        lane: Joi.string().trim().lowercase(),
        road: Joi.string().trim().lowercase(),
        subdistrict: Joi.string().trim().lowercase(),
        district: Joi.string().trim().lowercase(),
        province: Joi.string().trim().lowercase(),
        postalCode: Joi.string().trim(),
      }).min(1)
      .or('recipientname', 'houseNumber', 'village', 'lane', 'road', 'subdistrict', 'district', 'province', 'postalCode')
      .required().label('Address')
      .options({ messages: { 'Object.only': " must have at least 1 key" } }),
    role: Joi.string().valid('employee', 'customer', 'manager'),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim(),
    confirmpassword: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().valid(Joi.ref('password')).required().label('Comfirm password').options({ messages: { 'Object.only': " must have at least 1 key" } }),
        otherwise: Joi.any().strip()
      })
}).min(1).label('Request Body').options({ messages: { 'Object.only': " must have at least 1 key" } });
