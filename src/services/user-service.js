const prisma = require("../models/prisma");

module.exports = {
  createUser: (body) => {
    return prisma.user.create({
      data: {
        ...body,
        baskets: {
          create: {},
        },
      },
      include: {
        baskets: true,
      },
    });
  },
  findUserByEmail: (email) => {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  },
  findUserById: (id) => {
    return prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        baskets: {
          select: {
            id: true,
          },
          where: {
            AND: [{ userId: id }, { isPaid: false }],
          },
        },
      },
    });
  },
  updateUser: (id, obj) => {
    return prisma.user.update({
      where: { id },
      data: obj,
    });
  },
};
