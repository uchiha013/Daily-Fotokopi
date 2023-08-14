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
            res.json({
                massage: 'User Added Successfully'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({username: username})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    console.log(err);
                    // req.flash('error',err)
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({username: user.username}, 'Aqe25123,2,)', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful',
                        token
                    })
                    res.redirect('/') //Check 
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

module.exports ={
    register, login
}