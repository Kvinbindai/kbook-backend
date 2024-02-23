const express = require('express')
const router = express.Router()
const transactionController= require('../controllers/transaction-controller')
const upload = require('../middlewares/upload')

router.post('/',upload.single('slipImage'),transactionController.createTransaction)
router.get('/',transactionController.getAllTransaction)
router.get('/:transactionId',transactionController.getTransactionByTransactionId)
router.patch('/:transactionId',transactionController.updateByTransactionId)



module.exports = router