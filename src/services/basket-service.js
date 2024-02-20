const prisma = require('../models/prisma')


module.exports = {
    createBasket : (id) => {
        return prisma.basket.create({
            data : {
                userId : id
            }
        })
    },
    updateStatusBasketWhenCreateTransaction : (userId,basketId) => {
        return prisma.basket.update({
            where : {
                userId : userId,
                id : basketId
            },
            data : {
                isPaid : true
            }
        })
    }
}