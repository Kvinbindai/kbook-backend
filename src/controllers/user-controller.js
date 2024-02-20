const userService = require('../services/user-service')
const uploadService = require('../services/upload-service')
const { updateUserSchema } = require('../validators/user-validator')
const fs = require('fs/promises')
module.exports = {
    updateUser : async (req,res,next)=>{
        try{
            const data = await userService.findUserById(req.user.id)
            const value = await updateUserSchema.validateAsync(req.body)
            console.log(req.file)
            if(req.file){
                value.profileImage = await uploadService.upload(req.file.path)
                fs.unlink(req.file.path)
            }else{
                value.profileImage = data.profileImage
            }
            console.log(value)
            const updatedUser = await userService.updateUser(req.user.id,value)
            delete updatedUser.password
            console.log(updatedUser)
            return res.status(200).json({
                message : "update User Complete",
                updatedUser
            }) 
        }catch(err){
            next(err)
        }
    }
}