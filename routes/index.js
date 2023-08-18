var express = require('express');
var router = express.Router();


const services = require('../services/render');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
