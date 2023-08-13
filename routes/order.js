var express = require('express');
var router = express.Router();

const authenticate = require('../middleware/authenticate')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('order', { title: 'Express' });
});



module.exports = router;
