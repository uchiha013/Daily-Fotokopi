var express = require('express');
var router = express.Router();
const multer = require("multer");


const authenticate = require('../middleware/authenticate')
const FotokopiController = require('../controllers/fotokopiControllers');
const services = require('../services/render');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
 


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('order', { title: 'Express' });
// });
router.get('/', services.fotokopiRoutes)
router.get('/api/fotokopi', FotokopiController.index)
router.get('/show', FotokopiController.show)
router.post('/store',upload.single('image'), FotokopiController.daftarFotokopi)




module.exports = router;
