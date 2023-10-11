const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const Tokens = require('../models/tokens')

const register = asyncHandler( async (req,res)=>{
        const {email, password} = req.body;
        const dublicate= await User.findOne({email})
        if(dublicate){
            res.status(400);
            throw new Error('Пользователь с таким email уже существует')
        } else{
            const hashPassword  = await bcrypt.hash(password,10)
            const user = await User.create({email,password:hashPassword, tasks:[]})
            const accessToken = generateToken(user._id,process.env.JWT_ACCESS_SECRET, "10m");
            const refreshToken = generateToken(user._id,process.env.JWT_REFRESH_SECRET, "1d");
            await Tokens.create({userId: user._id, refreshToken});
            res.cookie('refreshToken', refreshToken, {maxAge:  Date.now() + 86400e3, httpOnly: true})
            if (user){
                res.status(201).json({
                    token:accessToken
                })
            }

        }
})

const login = asyncHandler( async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password)) ){
        try {
            const accessToken = generateToken(user._id,process.env.JWT_ACCESS_SECRET, "10m");
            const refreshToken = generateToken(user._id,process.env.JWT_REFRESH_SECRET, "1d");
            await Tokens.create({userId: user._id, refreshToken});
            res.cookie('refreshToken', refreshToken, {maxAge:  Date.now() + 86400e3, httpOnly: true})
            if (user){
                res.status(201).json({
                    token:accessToken
                })
            }
        }catch (e) {
            console.log(e);
            throw new Error(e)
        }

    } else{
        res.status(400);
        throw new Error('Введенные данные не верны')
    }
})

const refresh = asyncHandler(async (req, res)=>{
    try{
        const {refreshToken} = req.cookies;
        console.log(refreshToken)
        const userData =await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tokenData = await Tokens.findOne({refreshToken})
        const user = await User.findById(userData.id)
        const newAccessToken = generateToken(user._id,process.env.JWT_ACCESS_SECRET, "10m")
        const newRefreshToken = generateToken(user._id,process.env.JWT_REFRESH_SECRET,"1d")
        tokenData.refreshToken = newRefreshToken;
        tokenData.save();
        res.cookie('refreshToken', newRefreshToken, {maxAge:  Date.now() + 86400e3, httpOnly: true})
        res.status(200).json({token:newAccessToken})
    }catch (e) {
        res.status(403)
        throw new Error('Вы не авторизованы')
    }
})



function generateToken (id,secret,time) {
    return jwt.sign({id},secret, {expiresIn: time})
}


const logout = asyncHandler(async (req, res)=>{
    try{
        const {refreshToken} = req.cookies;
        const token = await Tokens.findOne({refreshToken})
        await Tokens.deleteMany({userId:token.userId})
        res.clearCookie('refreshToken');
        return res.json(true)
    }catch (e) {
        res.status(500)
        throw new Error(e.message)
    }
})


module.exports={
    register,
    refresh,
    login,
    logout
}
