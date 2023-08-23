const Joi = require('joi');
const create = Joi.object({
    items: Joi.array().items(
        Joi.object({
            book: Joi.string().alphanum(),
            amount: Joi.number().min(1),
            price: Joi.string().alphanum()
        }).min(1)
    ).min(1)
}).min(1).label('Request Body').options({ messages: { 'Object.only': " must have at least 1 key" } })
const update = Joi.object({
    status: Joi.string().valid('pending', 'completed', 'canceled').label('The request data').options({ messages: { 'String.only': "is invalid" } })
}).min(1).label('The request data').options({ messages: { 'String.only': "is invalid" } })
module.exports = {
    create,
    update
}