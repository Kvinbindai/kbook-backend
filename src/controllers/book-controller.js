const { bookSchema } = require("../validators/book-validator");
const createError = require("http-errors");
const bookService = require("../services/book-service");
const priceService = require("../services/price-service");
const prisma = require("../models/prisma");

module.exports = {
  geAllBook : async (req,res,next)=>{
   try{
    const data = await bookService.findAllBook()
    return res.status(200).json({
      message : 'All Book',
      data : data
    })
   }catch(err){
    next(err)
   }
  },
  getBookById : async (req,res,next)=>{
    try{
      const { bookId } = req.params
      const data = await bookService.findBookById(+bookId)
      return res.status(200).json({
        message : 'Get Your Book',
        data 
      })
    }catch(err){
      next(err)
    }
  },
  addBook: async (req, res, next) => {
    try {
      const value = await bookSchema.validateAsync(req.body);
      const data = await bookService.createBook(value);
      return res.status(200).json({
        message: "Create Book Complete",
        data
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
      const oldPriceId = oldObj.price[0].id
      const firstPromise = await priceService.updateExpiredPrice(oldPriceId,oldObj.id)
      const secondPromise = await priceService.createPriceByBookId(value.price,oldObj.id)
      const thirdPromise = await bookService.updateBook(oldObj,value)
      const result = await Promise.all([firstPromise,secondPromise,thirdPromise]) 
      return res.status(201).json({
        message : "update Complete",
        data : result[2]
      })
    } catch (err) {
      next(err);
    }
  },
  deleteBook : async(req,res,next)=>{
    try{
      const {bookId} = req.params
      await bookService.deleteBook(+bookId)
      return res.status(200).json({
        message : 'delete complete'
      })
    }catch(err){
      next(err)
    }
  }
};
