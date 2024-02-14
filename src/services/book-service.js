const prisma = require('../models/prisma')


module.exports = {
    createBook : (obj) => {
        return prisma.book.create({data : obj})
    },
    updateBook : (id,obj) =>{
        return prisma.book.update({
            where : {id},
            data : obj
        })
    }
}