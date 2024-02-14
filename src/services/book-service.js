const prisma = require("../models/prisma");

module.exports = {
  findBookById: (id) => {
    return prisma.book.findFirst({
      where: { id },
      include: {
        bookPrice: {
          include: {
            price: {
              select: {
                price: true,
                expiredAt: true,
              },
            },
          },
        },
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
        // ...obj,
        bookPrice: {
          create: {
            price: {
              create: {
                price: obj.price,
                createdAt: new Date(),
              },
            },
          },
        },
      },
      include: {
        bookPrice: {
          include: {
            price: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });
  },
  //   updateBook: (oldObj, newObj) => {
  //     return prisma.book.update({
  //       where: { id: oldObj.id },
  //       data: {
  //         enTitle: newObj.enTitle || oldObj.enTitle,
  //         thTitle: newObj.thTitle || oldObj.thTitle,
  //         enDescription: newObj.enDescription || oldObj.enDescription,
  //         thDescription: newObj.thDescription || oldObj.thDescription,
  //         categoryId: newObj.categoryId || oldObj.categoryId,
  //         amount: newObj.amount || oldObj.amount,
  //         bookImage: newObj.bookImage || oldObj.bookImage,
  //       }
  //     });
  //   },
  updateBook: (oldObj, newObj, oldPriceId) => {
    return prisma.book.upsert({
      where: { id: oldObj.id },
      update: {
        enTitle: newObj.enTitle || oldObj.enTitle,
        thTitle: newObj.thTitle || oldObj.thTitle,
        enDescription: newObj.enDescription || oldObj.enDescription,
        thDescription: newObj.thDescription || oldObj.thDescription,
        categoryId: newObj.categoryId || oldObj.categoryId,
        amount: newObj.amount || oldObj.amount,
        bookImage: newObj.bookImage || oldObj.bookImage,
        bookPrice : {
            where : {
                priceId : oldPriceId
            },
            price : {
                expiredAt : new Date()
            }
        }
      },
      create : {
        bookPrice : {
            price : {
                price : newObj.price
            }
        }
      },
      include: {
        category : {
            id : true
        },
        bookPrice: {
          include: {
            price: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });
  },
};
