const Joi = require('joi');

const register = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).trim().required(),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required().label('Comfirm password').options({ messages: { 'Object.only': " must match th password" } }),
});

const login = Joi.object({
    email: Joi.string().email().trim().required().label("Email"),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).trim().required().label("Password"),
});

const update = Joi.object({
    id: Joi.string().trim().min(1),
    role: Joi.string().valid('employee', 'customer', 'manager').label('Role').options({ messages: { 'String.only': " is not allow" } }),
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
        .label('Address')
        .options({ messages: { 'Object.only': " must have at least 1 key" } }),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().label("Password"),
    confirmpassword: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().valid(Joi.ref('password')).required().label('Comfirm password').options({ messages: { 'Object.only': " must match the password" } }),
        otherwise: Joi.any().strip()
    })
}).min(1).label('Request Body').options({ messages: { 'Object.only': " must have at least 1 key" } });

const search = Joi.object({
    id: Joi.string().trim().min(1).label('id'),
    email: Joi.string().trim().label('Email'),
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
        .label('Address')
        .options({ messages: { 'Object.only': " must have at least 1 key" } }),
    role: Joi.string().valid('employee', 'customer', 'manager').label('Role').options({ messages: { 'String.only': " is not allow" } }),
});

module.exports = {
    login,
    search,
    register,
    update
}