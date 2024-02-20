const Joi = require('joi')
const createError = require('http-errors')

const addBasketItemSchema = Joi.object({
    basketId : Joi.number().required().error(createError(400,'basketId is required')),
    bookId : Joi.number().required().error(createError(400,'basketId is required')),
    amount : Joi.number().required().error(createError(400,'amount is required')),
})

module.exports = { addBasketItemSchema }