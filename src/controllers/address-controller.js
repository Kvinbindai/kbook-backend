const addressService = require('../services/address-service')

module.exports = {
    addAddressToUser : async (req,res,next) => {
        try{
            const foundContact = await addressService.findContactByUserId(req.user.id)
            if(!foundContact){
                const data = await addressService.createContact(req.user.id,req.body)
                return res.status(201).json({
                    message : "Add Contact Complete",
                    data
                }) 
            }else{
                const data = await addressService.updateContactIfExits(req.user.id,req.body)
                return res.status(201).json({
                    message : "Update Contact Complete",
                    data
                })
            }
        }catch(err){
            next(err)
        }
    }
}