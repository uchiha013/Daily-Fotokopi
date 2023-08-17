var express = require('express');
var router = express.Router();
const multer = require("multer");

const authenticate = require('../middleware/authenticate')
const FotokopiController = require('../controllers/fotokopiControllers');


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
router.get('/', FotokopiController.index)
router.post('/show', FotokopiController.show)
router.post('/store',upload.single('image'), FotokopiController.daftarFotokopi)




module.exports = router;
