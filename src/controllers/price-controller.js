const {create , hide , getAll , getOne } = require('../services/price-service')

module.exports = {
    addPrice : async ( req ,res , next ) => {
        try{
            const data = await create(req.body)
            return res.status(201).json({
                message : 'Create Complete',
                data : data
            })
        }catch(err){
            next(err)
        }
    },
    deletePrice : async ( req ,res , next ) => {
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
    getAllPrice : async (req , res, next)=>{
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
    getPriceById : async (req , res, next)=>{
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