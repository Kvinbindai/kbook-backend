const prisma = require("../models/prisma");

module.exports = {
  createBasketItem: (obj) => {
    return prisma.basketItem.create({
      data: obj,
    });
  },

  findBasketIdByBookId: (basketId, bookId) => {
    return prisma.basketItem.findFirst({
      where: {
        basketId,
        bookId,
      },
    });
  },
  updateAmountBasketItemWhenAddSameBook: (obj, newAmount) => {
    return prisma.basketItem.update({
      where: {
        id : obj.id
      },
      data: {
        amount: obj.amount + newAmount,
      },
    });
  },

  updateBasketItemByBasketId : (obj) => {
    return prisma.basketItem.update({
      where : {
        id : obj.id
      },
      data : {
        amount : obj.amount
      }
    })
  },

  getAllListInBasket : (id) => {
    return prisma.basketItem.findMany({
      where : {
        basketId : id,
        book : {
          isActive : true
        }
      },
    include : {
      book : {
        select : {
          enTitle : true,
          enDescription : true,
          thDescription : true ,
          thTitle : true ,
          bookImage : true,
          isActive : true,
          category  : {
            select : {
              enTitle : true,
              thTitle : true
            }
          },
          price : {
            where : {
              expiredAt : null
            },
            select : {
              price : true,
              
            }
          }
        }
      }
    }
    })
  }
};
