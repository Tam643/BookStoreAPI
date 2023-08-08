const Joi = require('joi');
module.exports = Joi.object({
    title: Joi.string().trim(),
    author: Joi.string().trim(),
    description: Joi.string().trim(),
    isbn: Joi.string().trim(),
    genres: Joi.string().trim(),
    publisher: Joi.string().trim(),
});
