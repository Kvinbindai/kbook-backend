const {create , edit , hide ,getAll , getOne } = require('../services/category-service')
const { categorySchema } = require('../validators/category-validator')
module.exports = {
    addCategory : async ( req ,res , next ) => {
        try{
            const value = await categorySchema.validateAsync(req.body)
            console.log(value)
            const data = await create(value)
            return res.status(201).json({
                message : 'Create Complete',
                data : data
            })
        }catch(err){
            next(err)
        }
    },
    editCategory : async ( req ,res , next ) => {
        try{
            const { id } = req.params
            const value = await categorySchema.validateAsync(req.body)
            const data = await edit(+id ,value)
            return res.status(200).json({
                message : 'Update Complete',
                data : data
            })
        }catch(err){
            next(err)
        }
    },
    deleteCategory : async ( req ,res , next ) => {
        try{
            const { id } = req.params
            const data = await hide(+id)
            return res.status(200).json({
                message : 'Delete Complete',
                data : data
            })
        }catch(err){
            next(err)
        }
    },
    getAllCategory : async (req , res, next)=>{
        try{
            const data = await getAll()
            return res.status(200).json({
                message : 'Get All Data',
                data : data
            })
        }catch(err){
            next(err)
        }
    },
    getCategoryById : async (req , res, next)=>{
        try{
            const { id } = req.params
            const data = await getOne(+id)
            return res.status(200).json({
                message : 'Get By Id',
                data : data
            })
        }catch(err){
            next(err)
        }
    },
}