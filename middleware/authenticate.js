const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try{
        const token = req.headers.authentization.split(' ')[1]
        const decode = jwt.verify(token, 'Aqe25123,2,)')

        req.user = decode
        next( )
    }
    catch(error){
        res.json({
            message: 'Authentication failed'
        })
    }
}

module.exports = authenticate