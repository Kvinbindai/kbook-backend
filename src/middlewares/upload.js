const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'public/images')
    },
    filename : (req,file,cb)=>{
        // console.log(file) 
        // {
        //     fieldname: 'abcedf',
        //     originalname: 'corgi-4415649_1280.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg'
        //   }
        const filename = '' + Date.now() + Math.round(Math.random()* 1_000_000) + '.' + file.mimetype.split('/')[1]
        cb(null,filename)
    }
})

module.exports =  multer({storage})