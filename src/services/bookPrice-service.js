const prisma = require('../models/prisma')


module.exports = {
    createRelation : async (bookId , priceId) => {
        const bookPriceData = await prisma.bookPrice.create({
            data : {
                bookId,
                priceId
            }
        })
        return bookPriceData
    }, 
    findRelationByBookId : async (bookId) => {
        const lastRelation = await prisma.bookPrice.findFirst({
            where: {
                bookId,
                price : {
                    expiredAt : null
                }
            },

        });
        
        return lastRelation
    }
}