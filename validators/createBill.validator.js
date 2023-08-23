const Joi = require('joi');
module.exports = Joi.object({
    items: Joi.array().items(
        Joi.object({
            book : Joi.string().alphanum(),
            amount : Joi.number().min(1),
            price: Joi.string().alphanum()
        }).min(1)
    ).min(1)
}).min(1).label('Request Body').options({ messages: { 'Object.only': " must have at least 1 key" } });
