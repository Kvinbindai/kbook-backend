const express = require('express')
const bookController = require('../controllers/book-controller')
const { adminAccess } = require('../middlewares/roleAuth')
const router = express.Router()


router.post('/',adminAccess,bookController.addBook)
router.patch('/:bookId',adminAccess,bookController.editBook)


module.exports =  router