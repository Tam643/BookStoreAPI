const Joi = require('joi');
module.exports = Joi.object({
    image: Joi.any(),
    title: Joi.string().trim(),
    author: Joi.string().trim(),
    description: Joi.string().trim(),
    isbn: Joi.string().trim(),
    genres: Joi.array().items(Joi.string().trim()),
    publisher: Joi.string().trim(),
    prices: Joi.array().items(
        Joi.object({
            type: Joi.string().trim(),
            price: Joi.string().trim()
        })
    )
});
