const express = require('express')
const upload = require('../middlewares/upload')
const userController = require('../controllers/user-controller')
const router = express.Router()

router.patch('/',upload.single('profileImage'),userController.updateUser)


module.exports = router