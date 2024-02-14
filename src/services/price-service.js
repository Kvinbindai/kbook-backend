const prisma = require("../models/prisma");

module.exports = {
  createPriceByBookId: (price, bookId) => {
    return prisma.price.create({
      data: {
        price: price,
        bookId: bookId,
      },
    });
  },
  updateExpiredPrice: (oldPriceId,bookId) => {
    return prisma.price.update({
      where: {
        id: oldPriceId,
        bookId: bookId,
        expiredAt: null,
      },
      data: {
        expiredAt: new Date(),
      },
    });
  },
};
