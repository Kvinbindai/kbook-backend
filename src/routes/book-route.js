const express = require('express')
const bookController = require('../controllers/book-controller')
const { adminAccess } = require('../middlewares/roleAuth')
const router = express.Router()

router.get('/',bookController.geAllBook)
router.post('/',adminAccess,bookController.addBook)
router.patch('/:bookId',adminAccess,bookController.editBook)
router.delete('/:bookId',adminAccess,bookController.deleteBook)
router.get('/:bookId',bookController.getBookById)


module.exports =  router