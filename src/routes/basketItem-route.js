const express =require('express')
const basketItemController = require('../controllers/basketItem-controller')
const router = express.Router()

router.post('/',basketItemController.addBasketItem)
router.get('/',basketItemController.getAllBasketItemFromBasketId)
router.delete('/clear/:basketId',basketItemController.clearMyCartInBasketItem)
router.patch('/:basketId',basketItemController.updateAllAmountInBasket)


module.exports = router