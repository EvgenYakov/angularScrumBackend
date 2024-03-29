const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const Tokens = require('../models/tokens')

const protect = asyncHandler(async (req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            const refToken =await Tokens.findOne({userId:decoded.id})
            if (!refToken){
                throw new Error()
            }
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch (e) {
            console.log(e)
            res.status(401)
            throw new Error('Вы не авторизованы')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Вы не авторизованы, токена нет')
    }
})

module.exports = {
    protect
}
