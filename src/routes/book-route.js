const express = require('express')
const bookController = require('../controllers/book-controller')
const { adminAccess } = require('../middlewares/roleAuth')
const upload = require('../middlewares/upload')
const { authenticate } = require('../middlewares/authenticate')

const router = express.Router()

router.get('/',bookController.geAllBook)
router.post('/',authenticate,upload.single('bookImage'),adminAccess,bookController.addBook)
router.patch('/:bookId',authenticate,upload.single('bookImage'),adminAccess,bookController.editBook)
router.delete('/:bookId',authenticate,adminAccess,bookController.deleteBook)
router.get('/:bookId',bookController.getBookById)


module.exports =  router