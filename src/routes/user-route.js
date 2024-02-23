const express = require('express')
const upload = require('../middlewares/upload')
const userController = require('../controllers/user-controller')
const { authenticate } = require('../middlewares/authenticate')
const router = express.Router()

router.patch('/',authenticate,upload.single('profileImage'),userController.updateUser)


module.exports = router