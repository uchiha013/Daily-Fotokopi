var express = require('express');
var router = express.Router();

const authenticate = require('../middleware/authenticate')
const pesananController = require('../controllers/pesananController')
const services = require('../services/render');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('order', { title: 'Express' });
// });
router.get('/', services.OrderRoutes)
router.get('/api/order', authenticate, pesananController.index)


router.post('/show', pesananController.show)
router.post('/store', pesananController.store)
router.post('/update', pesananController.update)
router.post('/delete:id', pesananController.destroy)



module.exports = router;
