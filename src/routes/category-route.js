const express = require('express')
const categoryController = require('../controllers/category-controller')
const { adminAccess } = require('../middlewares/roleAuth')
const router = express.Router()

router.post('/',adminAccess,categoryController.addCategory)
router.patch('/:id',adminAccess,categoryController.editCategory)
router.delete('/:id',adminAccess,categoryController.deleteCategory)
router.get('/',categoryController.getAllCategory)
router.get('/:id',categoryController.getCategoryById)


module.exports = router