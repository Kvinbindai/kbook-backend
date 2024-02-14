const jwt = require('jsonwebtoken')
const privateKey = process.env.JWT_SECRET_KEY
const option = {
    expiresIn : 60*60*7 //7days
}
const createAccessToken = (payload) => {
    return jwt.sign(payload,privateKey,option)
}

const verifyToken = (token) => {
    return jwt.verify(token,privateKey)
}


module.exports = { createAccessToken , verifyToken }