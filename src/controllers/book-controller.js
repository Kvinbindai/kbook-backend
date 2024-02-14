const { bookSchema } = require("../validators/book-validator");
const createError = require("http-errors");
const bookService = require("../services/book-service");
const priceService = require("../services/price-service");
const bookPriceService = require("../services/bookPrice-service");
const prisma = require("../models/prisma");
module.exports = {
  addBook: async (req, res, next) => {
    try {
      const value = await bookSchema.validateAsync(req.body);
      const data = await bookService.createBook(value);
      const price = data.bookPrice[0].price.price;
      delete data.bookPrice;
      return res.status(200).json({
        message: "Create Book Complete",
        data: {
          ...data,
          price: price,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  editBook: async (req, res, next) => {
    try {
      const { bookId } = req.params;
      const value = await bookSchema.validateAsync(req.body);
      const oldObj = await bookService.findBookById(+bookId);
      const oldPriceId = oldObj.bookPrice[0].priceId;
      console.log(oldObj.bookPrice[0].priceId);
      const firstStep = priceService.updatePriceStatus(oldPriceId)
      const secondStep = priceService.create(value.price)
      const thirdStep = bookPriceService.createRelation(+bookId,secondStep.id)
      // const firstPromise = priceService.updatePriceStatus(oldPriceId);
      // const secondPromise = await priceService.create(value.price); //secondPromise.id
      // const newPriceId = secondPromise.id;
      // const createRelation = bookPriceService.createRelation(
      //   +bookId,
      //   newPriceId
      // );
      // const thirdPromise = await bookService.updateBook(oldObj, value,oldPriceId);
      // const result = await prisma.$transaction([
      //   // firstPromise,
      //   secondPromise,
      //   // createRelation,
      //   // thirdPromise
      // ]);
      res.json({
        data: thirdPromise,
      });
    } catch (err) {
      next(err);
    }
  },
};
