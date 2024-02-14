const Joi = require('joi')
const createError = require('http-errors')

const categorySchema = Joi.object({
    enTitle : Joi.string().optional().error(createError(400 , 'enTitle is required')),
    thTitle : Joi.string().optional().error(createError(400 , 'thTitle is required')),
    isActive : Joi.boolean().optional()
})

module.exports = {categorySchema}