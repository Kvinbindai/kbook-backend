const prisma = require('../models/prisma')


module.exports = {
    create : (obj) => {
        return prisma.category.create({data : obj})
    },
    edit : (id,data) => {
        return prisma.category.update({
            where : {
                id
            },
            data
        })
    },
    hide : (id) => {
        return prisma.category.update({
            where : {id},
            data : {
                isActive : false
            }
        })
    },
    getAll : () => {
        return prisma.category.findMany({
            where : {
                isActive : true
            }
        })
    },
    getOne : (id) => {
        return prisma.category.findFirst({
            where : {
                id
            }
        })
    }
}