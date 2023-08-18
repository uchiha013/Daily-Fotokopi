const jwt = require('jsonwebtoken')
const express = require("express");


const authenticate = (req, res, next) => {
    try{
        const token = req.cookies.authorization;
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = decode
        next()
    }
    catch(error){
        // if(error.name == "TokenExpiredError"){
        //     res.status(401).json({
        //         message: "Token Expired!"
        //     })
        // }
        res.clearCookie('123456cat');
        res.clearCookie(process.env.ACCESS_TOKEN_SECRET);
        res.clearCookie(process.env.REFRESH_TOKEN_SECRET);
        req.session.loggedin === false
        res.redirect('/')
        // res.json({
        //     message: 'Authentication failed'
        // })
    }
}

module.exports = authenticate