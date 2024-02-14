const express = require('express')
const priceController = require('../controllers/price-controller')
const { adminAccess } = require('../middlewares/roleAuth')
const router = express.Router()

router.post('/',adminAccess,priceController.addPrice)
router.delete('/:id',adminAccess,priceController.deletePrice)
router.get('/',priceController.getAllPrice)
router.get('/:id',priceController.getPriceById)



module.exports = router