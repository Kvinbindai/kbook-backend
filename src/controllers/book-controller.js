const {
  bookSchema,
  addBookSchema,
  UpdateBookSchema,
} = require("../validators/book-validator");
const createError = require("http-errors");
const bookService = require("../services/book-service");
const priceService = require("../services/price-service");
const uploadService = require("../services/upload-service");
const fs = require("fs/promises");

module.exports = {
  geAllBook: async (req, res, next) => {
    try {
      const data = await bookService.findAllBook();
      const result = data.map((e) => {
        return {
          ...e,
          ["price"]: e.price[0].price,
        };
      });
      return res.status(200).json({
        message: "All Book",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  getBookById: async (req, res, next) => {
    try {
      const { bookId } = req.params;
      const data = await bookService.findBookById(+bookId);
      const price = data.price[0].price;
      const categoryEn = data.category.enTitle;
      const categoryTh = data.category.thTitle;
      data.price = price;
      data.categoryEn = categoryEn;
      data.categoryTh = categoryTh;
      delete data.category;
      return res.status(200).json({
        message: "Get Your Book",
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  addBook: async (req, res, next) => {
    try {
      console.log(req.body)
      
      req.body.categoryId = +req.body.categoryId;
      req.body.amount = +req.body.amount;
      req.body.price = +req.body.price;
      console.log(req.file)
      
      req.body.bookImage = await uploadService.upload(req.file.path);
      fs.unlink(req.file.path);
      const value = await addBookSchema.validateAsync(req.body);
      // console.log(value)
      const data = await bookService.createBook(value);
      const allList = await bookService.findAllBook()
      return res.status(200).json({
        message: "Create Book Complete",
        data,
        allList
      });
    } catch (err) {
      next(err);
    }
  },

  editBook: async (req, res, next) => {
    try {
      const { bookId } = req.params;
      // req.body.price = +req.body.price;
      console.log(req.body)
      if(req.body.isActive === '0'){
        req.body.isActive = false
      }else{
        req.body.isActive = true
      }
      
      const value = await UpdateBookSchema.validateAsync(req.body);
      const oldObj = await bookService.findBookById(+bookId);
      if(req.file){
        value.bookImage = await uploadService.upload(req.file.path);
        fs.unlink(req.file.path);
      }else{
        delete value.bookImage
      }
      if (!value.price) {
        const data = await bookService.updateBookWithNoPrice(oldObj, value);
        console.log(data)
        return res.status(201).json({
          message: "update Complete",
          data,
        });
      } else {
        const oldPriceId = oldObj.price[0].id;
        const firstPromise = await priceService.updateExpiredPrice(
          oldPriceId,
          oldObj.id
        );
        const secondPromise = await priceService.createPriceByBookId(
          value.price,
          oldObj.id
        );
        const thirdPromise = await bookService.updateBook(oldObj, value);
        const data = await Promise.all([
          firstPromise,
          secondPromise,
          thirdPromise,
        ]);
        data[2].price = data[2].price[0].price;
        return res.status(201).json({
          message: "Update Complete",
          data: data[2],
        });
      }
    } catch (err) {
      next(err);
    }
  },
  deleteBook: async (req, res, next) => {
    try {
      const { bookId } = req.params;
      await bookService.deleteBook(+bookId);
      return res.status(200).json({
        message: "delete complete",
      });
    } catch (err) {
      next(err);
    }
  },
};
