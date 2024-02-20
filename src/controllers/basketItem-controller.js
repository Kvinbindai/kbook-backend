const basketItemService = require('../services/basketItem-service')
const { addBasketItemSchema } = require('../validators/basketItem-validator')

module.exports = {
    addBasketItem : async (req,res,next)=>{
        try{
            const value = await addBasketItemSchema.validateAsync(req.body)
            const foundBasketItem = await basketItemService.findBasketIdByBookId(req.body.basketId,req.body.bookId)
            if(!foundBasketItem){
                const data = await basketItemService.createBasketItem(value)
                return res.status(201).json({
                    message : "Create BasketItem Complete",
                    data 
                })
            }else{
                //update basketitem เดิม
                const data = await basketItemService.updateAmountBasketItemWhenAddSameBook(foundBasketItem,value.amount)
                return res.status(200).json({
                    message : "update complete",
                    data
                })
            }
           
        }catch(err){
            next(err)
        }
    },
    getAllBasketItemFromBasketId :  async (req,res,next) => {
        try{
            const data = await basketItemService.getAllListInBasket(req.user.basketId)
            data[0].price = data[0].book.price[0].price
            delete data[0].book
            return res.status(200).json({
                message : "get all list in your basket",
                data 
            })
        }catch(err){
            next(err)
        }
    },
    // updateBasketItemByBasketId
    updateAllAmountInBasket : async (req,res,next)=>{
        try{
            const allBasketItem = req.body //array
            // console.log(allBasketItem)
            let allPromise = []
            for(let i=0;i<allBasketItem.length;i++){
                const data = {
                    id : allBasketItem[i].id,
                    basketId : allBasketItem[i]['basketId'],
                    bookId :allBasketItem[i]['bookId'],
                    amount : allBasketItem[i]['amount']
                }
                const promise = basketItemService.updateBasketItemByBasketId(data)
                allPromise.push(promise)
            }
            const data = await Promise.all(allPromise)
            // console.log(res.data)
            return res.status(200).json({
                message: "Update basketItem complete",
                data : data
            })
        }catch(err){
            next(err)
        }
    }
}