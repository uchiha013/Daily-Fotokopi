var express = require('express');
var router = express.Router();

const authenticate = require('../middleware/authenticate')
const services = require('../services/render');

/* GET home page. */
router.get('/', services.IndexRoutes);


router.get('/logout', authenticate , function(req, res, next) {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});


module.exports = router;
