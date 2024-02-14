const Joi = require('joi')
const createError = require('http-errors')

const bookSchema = Joi.object({
    enTitle : Joi.string().optional(),
    thTitle : Joi.string().optional(),
    enDescription : Joi.string().optional(),
    thDescription : Joi.string().optional(),
    amount : Joi.string().optional(),
    categoryId : Joi.number().required().error(createError(400,'Category is required')),
    price : Joi.number().optional()
})

module.exports = { bookSchema }