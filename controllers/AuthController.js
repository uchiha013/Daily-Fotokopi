const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            console.log(err);
            res.json({
                error: err
            });
        }
        let user = new User ({
            username: req.body.username,
            password: hash
        })
        user.save()
        .then(user => {
            // res.status(200).send("Register berhasil ditambahkan");
            res.send({message:'Register Berhasil silahkan untuk login'});
            console.log("Berhasil")
        })
        .catch(error =>{
            // res.status(200).send("Register Gagal");
            res.send({message:'Register Gagal'});
            console.log("Gagal")
        })
    })
}

const login = (req, res, session) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({username: username})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    console.log(err);
                    // req.flash('error',err)
                    
                }
                if(result){
                    let token = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
                    let refreshtoken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
                    // res.json({
                    //     message: 'Login Successful',
                    //     token
                    // })
                    // session.setItem("token",token);
                    res.cookie("authorization", token, {
                        httpOnly: true, // more secure
                        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
                        sameSite: "strict", // CSRF
                    });
                    req.session.loggedin = true;
                    res.redirect("/");
                }else{
                    // req.flash('message','Password does not Mathced !')
                    res.json({
                        message: 'Password does not Mathced !'
                    })
                }
            })
        }else{
            // req.flash('message','no user found!')
            res.json({
                meesage: 'no user found!'
            })
        }
    })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, decode){
        if(err){
            res.status(400).json({
                err
            })
        }
        else {
            let token = jwt.sign( {name: decode.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
            let refreshToken = req.body.refreshToken

            res.setHeader("authorization", 'Bearer ' + token);
            res.redirect("/");
        }
    })
}

module.exports ={
    register, login, refreshToken
}