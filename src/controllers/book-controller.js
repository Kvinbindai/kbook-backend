const { bookSchema } = require("../validators/book-validator");
const createError = require('http-errors')
const bookService = require('../services/book-service')
const priceService = require('../services/price-service')
const bookPriceService = require('../services/bookPrice-service')
module.exports = {
  addBook: async (req, res, next) => {
    try {
      // const value = await bookSchema.validateAsync(req.body);
      // const newPrice = value.price
      // delete value.price
      // const newBook = await bookService.createBook(value)
      // const { id } = await priceService.create(newPrice) //create price at table price
      // const priceId = id
      
      // const bookId = newBook.id
      // const dataFromRelation = await bookPriceService.createRelation(bookId,priceId) // create relation 
      // const priceFromRelation = await priceService.getCurrentPrice(dataFromRelation.priceId)
        
      // return res.status(200).json({
      //   message: "Create Book Complete",
      //   data : {...newBook, price : priceFromRelation.price},
      // });
    } catch (err) {
      next(err);
    }
  },
  
  editBook : async(req,res,next) => {
    try{
        const {bookId} = req.params
        const value = await bookSchema.validateAsync(req.body);
        const { price } = value
        delete value.price
        const foundRelation = await bookPriceService.findRelationByBookId(+bookId)
        if(!foundRelation) createError.BadRequest()
        await priceService.updatePriceStatus(foundRelation.priceId) //update expiredAt on price table
        const { id } = await priceService.create(price) // create newPrices
        const dataFromRelation = await bookPriceService.createRelation(+bookId,id) //create relation
        const priceFromRelation = await priceService.getCurrentPrice(dataFromRelation.priceId)
        const updatedBook = await bookService.updateBook(+bookId,value) //update Book
        return res.status(200).json({
          message : 'Update complete',
          data : {...updatedBook,price : priceFromRelation.price}
        })
    }catch(err){
        next(err)
    }
  }
};
