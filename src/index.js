const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT
const authRoute = require('./routes/auth-route')
const categoryRoute = require('./routes/category-route')
const userRoute = require('./routes/user-route')
const bookRoute = require('./routes/book-route')
const basketItemRoute = require('./routes/basketItem-route')
const addressRoute = require('./routes/address-route')
const transactionRoute = require('./routes/transaction-route')
const { authenticate } = require('./middlewares/authenticate')


//middlewares
app.use(express.json())
app.use(cors())

//auth
app.use('/auth',authRoute)
//verifyToken => to check user => add req.user to req


app.use('/users',userRoute)

app.use('/category',authenticate,categoryRoute)

app.use('/books',bookRoute)

app.use('/basketItem',authenticate,basketItemRoute)

app.use('/address',authenticate,addressRoute)

app.use('/transactions',authenticate,transactionRoute)


//handleError
app.use((err,req,res,next)=>{
    console.log(err)
    err.statusCode = err.statusCode || 500
    // console.log(err.statusCode)
    return res.status(err.statusCode).json({
        message : err.message,
        code : err.code
    })
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})