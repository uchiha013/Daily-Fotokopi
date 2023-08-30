var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { message: '' });
});


router.post('/api/register', AuthController.register);

module.exports = router;
