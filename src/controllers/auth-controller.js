const userService = require("../services/user-service");
const createError = require("http-errors");
const {
  addUserSchema,
  loginUserSchema,
} = require("../validators/user-validator");
const basketItemService = require("../services/basketItem-service");
const { createAccessToken } = require("../services/token-service");
const { hashPassword, comparePassword } = require("../services/hash-service");
const addressService = require("../services/address-service");
const basketService = require("../services/basket-service");
const transactionService = require("../services/transaction-service");
const { basket } = require("../models/prisma");

module.exports = {
  register: async (req, res, next) => {
    try {
      const value = await addUserSchema.validateAsync(req.body);
      if (value.password !== value.confirmPassword)
        createError(400, "Password and ConfirmPassword doesnt match");
      delete value.confirmPassword;
      value.password = await hashPassword(value.password);
      const foundUser = await userService.findUserByEmail(value.email);

      //   console.log(foundUser)
      if (foundUser) {
        return res.status(400).json({
          message: "User Already Create",
        });
      } else {
        const newUser = await userService.createUser(value);
        newUser['basketId'] = newUser.baskets.id
        delete newUser.baskets
        // const newBasket = await basketService.createBasket(newUser.id)
        // const result = await Promise.all([newUser,newBasket])
        delete newUser.password;
        const accessToken = createAccessToken(newUser);
        return res.status(201).json({
          message: "Create User Complete",
          data: newUser,
          accessToken,
        });
      }
      // console.log(value)
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const value = await loginUserSchema.validateAsync(req.body);
      console.log(value);
      const foundUser = await userService.findUserByEmail(value.email);
      if (!foundUser) throw createError(404, "User Not Found");
      const isMatch = await comparePassword(value.password, foundUser.password);
      if (!isMatch) throw createError(404, "Invalid Credentials");
      delete foundUser.password;
      const accessToken = createAccessToken(foundUser);
      if(foundUser.role !== "ADMIN"){
        const myBasketId = await basketService.findBasketByUserId(foundUser.id)
        // console.log(myBasketId)
        const allItem = await basketItemService.getAllListInBasket(myBasketId.id)
        // console.log(allItem)
        const myContact = await addressService.findContactByUserId(foundUser.id)
        let totalAmount = 0 
        let totalPrice = 0
        for(let i = 0;i<allItem.length;i++){
          // console.log(allItem[i]['book']['price'][0]['price'])
          allItem[i]['price'] = allItem[i]['book']['price'][0]['price']
          totalAmount += allItem[i]['amount']
          totalPrice += (allItem[i]['price']*allItem[i]['amount'])
        }
        const transactions = await transactionService.findAllTransactionByUserId(foundUser.id)
        // const myBasketId = req.user.baskets[0]?.id;
        // delete req.user.baskets;
        // foundUser.basketId = 
        return res.json({
          message: "Get Your Profile",
          user: {
            ...foundUser,
            ["basketId"]: myBasketId.id,
            ['allItem'] : allItem,
            totalAmount,
            totalPrice,
            contact : myContact,
            transactions
          },
          accessToken,
        });
      }
      return res.status(200).json({
        message: "Login Success",
        user: foundUser,
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  },
  getMe: async (req, res, next) => {
    try {
      if (req.user.role !== "ADMIN") {
        const allItem = await basketItemService.getAllListInBasket(req.user.basketId)
        const myContact = await addressService.findContactByUserId(req.user.id)
        let totalAmount = 0 
        let totalPrice = 0
        for(let i = 0;i<allItem.length;i++){
          // console.log(allItem[i]['book']['price'][0]['price'])
          allItem[i]['price'] = allItem[i]['book']['price'][0]['price']
          totalAmount += allItem[i]['amount']
          totalPrice += (allItem[i]['price']*allItem[i]['amount'])
        }
        const myBasketId = req.user.baskets[0]?.id;
        delete req.user.baskets;
        const transactions = await transactionService.findAllTransactionByUserId(req.user.id)
        return res.json({
          message: "Get Your Profile",
          user: {
            ...req.user,
            ["basketId"]: myBasketId,
            ['allItem'] : allItem,
            totalAmount,
            totalPrice,
            contact : myContact,
            transactions
          },
        });
      }
      return res.json({
        message: "Get Your Profile",
        user: {
          ...req.user,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
