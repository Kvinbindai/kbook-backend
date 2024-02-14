const prisma = require('../models/prisma')

module.exports = {
    createUser :  (body) => {
       return prisma.user.create({data : body})
    },
    findUserByEmail : (email) => {
        return prisma.user.findFirst({
            where : {
               email
            }
        })
    },
}