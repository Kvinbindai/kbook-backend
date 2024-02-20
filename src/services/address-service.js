const prisma = require('../models/prisma')


module.exports= {
    createContact : (userId,obj)=>{
        return prisma.contact.create({
            data : {
                ...obj,
                userId : userId
            }
        })
    },
    updateContactIfExits : (userId,obj)=>{
        return prisma.contact.update({
            where : {
                userId 
            },
            data: {
                ...obj
            }
        })
    },
    findContactByUserId : (userId) => {
        return prisma.contact.findFirst({
            where :{
                userId
            }
        })
    }
}

