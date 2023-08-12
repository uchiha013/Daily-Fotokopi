const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }

        let user = new User ({
            username: req.body.username,
            password: hashedPass
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

module.exports ={
    register
}