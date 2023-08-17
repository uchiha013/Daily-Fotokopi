var express = require('express');
var router = express.Router();

const authenticate = require('../middleware/authenticate')
const OrderController = require('../controllers/orderController')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('order', { title: 'Express' });
// });
router.get('/', authenticate, OrderController.index)
router.post('/show', OrderController.show)
router.post('/store', OrderController.store)
router.post('/update', OrderController.update)
router.post('/delete:id', OrderController.destroy)



module.exports = router;
