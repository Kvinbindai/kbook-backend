const prisma = require("../models/prisma");

module.exports = {
  findAllTransactionInTable: () => {
    return prisma.transactions.findMany({
      include: {
        basket: {
          select: {
            BasketItem: {
              select: {
                amount: true,
                book: {
                  select: {
                    enTitle: true,
                    thTitle: true,
                    category: {
                      select: {
                        enTitle: true,
                        thTitle: true,
                      },
                    },
                    price: {
                      select: {
                        price: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  findTransactionById: (id) => {
    return prisma.transactions.findFirst({
      where: {
        id,
      },
      include: {
        basket: {
          select: {
            BasketItem: {
              select: {
                amount: true,
                book: {
                  select: {
                    enTitle: true,
                    thTitle: true,
                    category: {
                      select: {
                        enTitle: true,
                        thTitle: true,
                      },
                    },
                    price: {
                      select: {
                        price: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  createNewTransaction: (obj) => {
    return prisma.transactions.create({
      data: obj,
    });
  },
  findAllTransactionByUserId: (userId) => {
    return prisma.transactions.findMany({
      where: {
        userId: userId,
        basket: {
          isPaid: true,
        },
      },
      include: {
        basket: {
          select: {
            BasketItem: {
              select: {
                amount: true,
                book: {
                  select: {
                    enTitle: true,
                    thTitle: true,
                    category: {
                      select: {
                        enTitle: true,
                        thTitle: true,
                      },
                    },
                    price: {
                      where : {
                        expiredAt : null
                      },
                      select : {
                        price : true
                      }
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },
  updateTransactionStatus : (id,data) => {
    return prisma.transactions.update({
      where : {
        id
      },
      data : {
        note : data.note,
        status : data.status
      }
    })
  }
};
