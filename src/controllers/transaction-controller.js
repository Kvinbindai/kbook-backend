const bookService = require("../services/book-service");
const uploadService = require("../services/upload-service");
const transactionService = require("../services/transaction-service");
const createError = require("http-errors");
const fs = require("fs/promises");
const basketService = require("../services/basket-service");
const basketItemService = require("../services/basketItem-service");
module.exports = {
  getAllTransaction: async (req, res, next) => {
    try {
      const data = await transactionService.findAllTransactionInTable();
      // data['basketItem'] = data['basket']['BasketItem']
      // console.log(data.basket)
      for(let i=0;i<data.length;i++){
      //   // console.log(data[i]['basket']['BasketItem'])
        data[i]['basketItem'] = data[i]['basket']['BasketItem']
        for(let j=0;j<data[i]['basketItem'];j++){
          // data[i]['basketItem'][j]['enTitle'] = data[i]['basketItem'][j]['book']['enTitle']
          // data[i]['basketItem'][j]['thTitle'] = data[i]['basketItem'][j]['book']['thTitle']
          // data[i]['basketItem'][j]['category_en_name'] = data[i]['basketItem'][j]['book']['enTitle']
          // data[i]['basketItem'][j]['category_th_name'] = data[i]['basketItem'][j]['book']['thTitle']
          // data[i]['basketItem'][j]['price'] = data[i]['basketItem'][j]['book']['price'][0]['price']
          data[i]['basketItem'][j] = {
            ...data[i]['basketItem'][j],
            ...data[i]['basketItem'][j]['book'],
            price : data[i]['basketItem'][j]['book'][0]['price']
          }
          delete data[i]['basketItem'][j]['book']
        }
        delete data[i]['basket']
      }
      console.log(data)
      return res.status(200).json({
        message: "All Transaction",
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  getTransactionByTransactionId : async ( req ,res ,next) => {
    try{
        const {transactionId } = req.params
        // console.log(transactionId)
        const data =await transactionService.findTransactionById(+transactionId)
        console.log(data)
    }catch(err){
        next(err)
    }
  },

  createTransaction: async (req, res, next) => {
    try {
      console.log(req.body);
      req.body.allItem = JSON.parse(req.body.allItem);
      req.body.basketId = +req.body.basketId;
      const {
        allItem,
        basketId,
        slipImage,
        totalPrice,
      } = req.body;

      // console.log(req.body)
      const errorObj = [];
      for (let i = 0; i < allItem.length; i++) {
        // console.log(allItem[i])
        const res = await bookService.getAmountOfBookByBookId(
          allItem[i].bookId
        );
        if (allItem[i].amount > res.amount) {
          const obj = {
            bookId: allItem[i].bookId,
            bookTitle:
              allItem[i]["book"]["enTitle"] || allItem[i]["book"]["thTitle"],
            message: `Your ${
              allItem[i]["book"]["enTitle"] || allItem[i]["book"]["thTitle"]
            } is out of stock`,
          };
          errorObj.push(obj);
        }
      }
      const checkBasketItemInBasketId =
        await basketItemService.getAllListInBasket(basketId);
      // console.log(errorObj)
      if (errorObj.length > 0 || checkBasketItemInBasketId.length === 0) {
        return res.status(400).json({
          message: "Cant Create Transaction",
          errorObj,
        });
      } else {
        if (!req.file) {
          createError(400, "Slip Image Not Found");
        } else {
          req.body.slipImage = await uploadService.upload(req.file.path);
        }
        fs.unlink(req.file.path);
        const transaction = {
          userId: req.user.id,
          basketId: basketId,
          totalPrice: +totalPrice,
          slipImage: req.body.slipImage,
        };
        const promiseArray = [];
        const firstPromise =
          transactionService.createNewTransaction(transaction); //create transaction
        const secondPromise =
          basketService.updateStatusBasketWhenCreateTransaction(
            req.user.id,
            basketId
          ); //update basketId
        const thirdPromise = basketService.createBasket(req.user.id); // create new basket for this user

        // const result = await Promise.all([firstPromise,secondPromise,thirdPromise])
        promiseArray.push(firstPromise, secondPromise, thirdPromise);

        for (let i = 0; i < allItem.length; i++) {
          const res = await bookService.getAmountOfBookByBookId(
            allItem[i].bookId
          ); //res.amount : 200
          const newAmount = res.amount - allItem[i].amount;
          const item = bookService.UpdateAmountBookByBookId(
            allItem[i].bookId,
            newAmount
          );
          promiseArray.push(item);
        }

        const result = await Promise.all(promiseArray);
        const newAllItem = await basketItemService.getAllListInBasket(
          result[2].id
        );
        return res.status(200).json({
          message: "Create Transaction Complete",
          newBasketId: result[2].id,
          allItem: newAllItem,
        });
      }
      // const res = await bookService.getAmountOfBookByBookId(req.body.allItem[0].id)
      // console.log(res)
      // console.log(req.file)
    } catch (err) {
      next(err);
    }
  },
  updateByTransactionId : async (req,res,next) => {
    try{
      const { transactionId} = req.params
      const data = await transactionService.updateTransactionStatus(+transactionId,req.body)
      return res.status(200).json({
        message : "Update Transaction Complete",
        data
      })
    }catch(err){
      next(err)
    }
  },
  
};
