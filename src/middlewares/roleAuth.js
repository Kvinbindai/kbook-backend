const adminAccess =  (req,res,next) =>{
    if(req.user.role !== 'ADMIN'){
        return res.status(401).json({
            message : 'No Permission'
        })
    }
    next()
}




module.exports = { adminAccess }