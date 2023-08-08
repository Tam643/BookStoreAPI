const Joi = require('joi');
module.exports = Joi.object({
    image: Joi.any().required(),
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    description: Joi.string().trim(),
    isbn: Joi.string().trim().required(),
    genres: Joi.array().items(Joi.string().trim().required()),
    publisher: Joi.string().trim().required(),
    prices: Joi.array().items(
        Joi.object({
            type: Joi.string().trim().required(),
            price: Joi.string().trim().required()
        })
    )
});
