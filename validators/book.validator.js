const Joi = require('joi');
const update = Joi.object({
    image: Joi.any(),
    title: Joi.string().trim(),
    author: Joi.string().trim(),
    description: Joi.string().trim(),
    isbn: Joi.string().trim(),
    genres: Joi.array().items(Joi.string().trim()).min(1),
    publisher: Joi.string().trim(),
    prices: Joi.array().items(
        Joi.object({
            type: Joi.string().trim(),
            price: Joi.string().trim()
        })
    )
}).min(1);

const create = Joi.object({
    image: Joi.any().required(),
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    description: Joi.string().trim(),
    isbn: Joi.string().trim().required(),
    genres: Joi.array().items(Joi.string().trim()).required().min(1),
    publisher: Joi.string().trim().required(),
    prices: Joi.array().items(
        Joi.object({
            type: Joi.string().trim().required(),
            price: Joi.string().trim().required()
        })
    )
});

const search = Joi.object({
    title: Joi.string().trim(),
    author: Joi.string().trim(),
    isbn: Joi.string().trim(),
    genres: Joi.string().trim(),
    publisher: Joi.string().trim(),
}).min(1)

module.exports = {
    create,
    update,
    search,
}
