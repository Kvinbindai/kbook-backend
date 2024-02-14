const prisma = require("../models/prisma");

module.exports = {
  create: (price) => {
    return prisma.price.create({ data: { price: price } });
  },
  hide: (id) => {
    return prisma.price.update({
      where: { id },
      data: {
        expiredAt: Date.now(),
      },
    });
  },
  getAll: () => {
    return prisma.price.findMany({});
  },
  getOne: (id) => {
    return prisma.price.findFirst({
      where: {
        id,
      },
    });
  },

  getCurrentPrice: (id) => {
    return prisma.price.findFirst({
      where: {
        id,
        expiredAt: null,
      },
    });
  },

  updatePriceStatus : (id) => {
    return prisma.price.update({
      where : {id : id},
      data : {
        expiredAt : new Date()
      }
    })
  }
};
