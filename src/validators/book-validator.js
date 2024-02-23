const Joi = require('joi')
const createError = require('http-errors')

const addBookSchema = Joi.object({
    enTitle : Joi.string().optional(),
    thTitle : Joi.string().optional(),
    enDescription : Joi.string().optional(),
    thDescription : Joi.string().optional(),
    amount : Joi.number().optional(),
    categoryId : Joi.number().required().error(createError(400,'Category is required')),
    price : Joi.number().required(),
    bookImage : Joi.string().required(),
})
const UpdateBookSchema = Joi.object({
    enTitle : Joi.string().optional(),
    thTitle : Joi.string().optional(),
    enDescription : Joi.string().optional(),
    thDescription : Joi.string().optional(),
    amount : Joi.number().optional(),
    categoryId : Joi.number().optional(),
    price : Joi.number().optional(),
    isActive: Joi.boolean().optional(),
    bookImage : Joi.string().optional(),
})

module.exports = { addBookSchema  ,UpdateBookSchema }