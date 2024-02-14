const bcrypt = require('bcryptjs')

const hashPassword =  (password) => {
    return bcrypt.hash(password , 10)
}

const comparePassword = (text, hash) => {
    return bcrypt.compare(text,hash)
}


module.exports = { hashPassword , comparePassword }