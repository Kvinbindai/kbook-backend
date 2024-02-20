const prisma = require("../models/prisma");
const priceService = require('../services/price-service')


//เหลือ findBook


module.exports = {
  findAllBook: () => {
    return prisma.book.findMany({
      include: {
        price: {
          where: {
            expiredAt: null,
          },
        },
      },
    });
  },

  findBookById: (id) => {
    return prisma.book.findFirst({
      where: { 
        id
       },
      select: {
        id : true,
        enTitle: true,
        thTitle: true,
        enDescription: true,
        thDescription: true,
        category :{
          select : {
            enTitle : true,
            thTitle : true
          }
        },
        amount: true,
        bookImage: true,
        price: {
          where : {
            expiredAt : null
          }
        }
      },
    });
  },

  createBook: (obj) => {
    return prisma.book.create({
      data: {
        enTitle: obj.enTitle || null,
        thTitle: obj.thTitle || null,
        enDescription: obj.enDescription || null,
        thDescription: obj.thDescription || null,
        categoryId: obj.categoryId,
        amount: obj.amount || 0,
        bookImage: obj.bookImage || null,
        price: {
          create: {
            price: obj.price,
            expiredAt: null,
          },
        },
      },
      include: {
        price: {
          select: {
            price: true,
          },
        },
      },
    });
  },
  updateBook: async (oldObj, newObj) => {
    return prisma.book.update({
      where: { id: oldObj.id },
      data: {
        enTitle: newObj.enTitle || oldObj.enTitle,
        thTitle: newObj.thTitle || oldObj.thTitle,
        enDescription: newObj.enDescription || oldObj.enDescription,
        thDescription: newObj.thDescription || oldObj.thDescription,
        categoryId: newObj.categoryId || oldObj.categoryId,
        amount: newObj.amount || oldObj.amount,
        bookImage: newObj.bookImage || oldObj.bookImage,
      },
      select: {
        id : true,
        enTitle: true,
        thTitle: true,
        enDescription: true,
        thDescription: true,
        categoryId: true,
        amount: true,
        bookImage: true,
        price: {
          where : {
            expiredAt : null
          }
        } 
      },
    });
  },

  updateBookWithNoPrice : (oldObj ,newObj) => {
    return prisma.book.update({
      where : {
        id : oldObj.id
      },
      data : newObj
    })
  },

  deleteBook : async (id) => {
    return prisma.book.update({
      where : {
        id
      },
      data : {
        isActive : false
      }
    })
  }
};
