const Joi = require('joi')
const createError = require('http-errors')

const addUserSchema = Joi.object({
    firstName : Joi.string().trim().required().error(createError(400,'firstname is required')),
    lastName  : Joi.string().trim().required().error(createError(400,'firstname is required')),
    email : Joi.string().trim().email({ allowFullyQualified : true}).error(createError(400 , 'email is required')),
    password : Joi.string().trim().required().pattern(/^[a-zA-z0-9]{6,}$/).error(createError(400,'password is required')),
    phoneNumber : Joi.string().trim().required().pattern(/^[0-9]{10}$/).error(createError(400,'phone number is required')),
    role : Joi.string().optional()
})

const loginUserSchema = Joi.object({
    email : Joi.string().trim().email({ allowFullyQualified : true}).error(createError(400 , 'email is required')),
    password : Joi.string().trim().required().pattern(/^[a-zA-z0-9]{6,}$/).error(createError(400,'password is required')),
})


module.exports = {addUserSchema , loginUserSchema}