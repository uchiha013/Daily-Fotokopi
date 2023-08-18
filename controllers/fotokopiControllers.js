const multer = require("multer");
var fs = require('fs');
var path = require('path');
const Fotokopi = require("../models/fotokopi")


const daftarFotokopi = (req, res, next) => {
    let daftarFotokopi = new Fotokopi ({
        namafotokopi: req.body.namafotokopi,
        alamat: req.body.alamat,
        whatsapp: req.body.whatsapp,
        fasilitas: req.body.fasilitas.replace(/\s/g, '').split(","),
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', 'uploads' , req.file.filename)),
            contentType: 'image/png'
        }
    })
    daftarFotokopi.save()
    .then(response => {
        res.json({
            massage: 'Data fotokopi Added Successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const index = (req, res, next) => {
    Fotokopi.find()
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.send(data)
        // res.render('fotokopi')
    })
}

const show = (req, res, next) => {
    let OrderId = req.body.OrderId

    Order.findById(OrderId)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports ={
    daftarFotokopi, index, show
}