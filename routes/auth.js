var express = require('express')
var router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// router.get('/', function(req, res, next) {
//     res.send("test");
// });

module.exports = router;