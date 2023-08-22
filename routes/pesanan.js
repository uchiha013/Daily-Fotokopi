var express = require('express');
var router = express.Router();
const authenticate = require('../middleware/authenticate')

const pesananController = require('../controllers/pesananController')
const services = require('../services/render')

/* GET home page. */
router.get('/',services.PesananRoutes);
router.get('/api/pesanan',pesananController.index)

module.exports = router;
